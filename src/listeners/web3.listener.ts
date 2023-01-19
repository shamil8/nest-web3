import { Injectable } from '@nestjs/common';
import { camelToSnakeCase } from '@app/crypto-utils/functions/core.util';
import { timeToMs } from '@app/crypto-utils/functions/time.util';
import { LoggerService } from '@app/logger/services/logger.service';
import { ProducerService } from '@app/rabbit/services/producer.service';
import { ExchangeRabbit } from '@app/rabbit/enums/exchange-rabbit';

import { Web3Config } from '../config/web3.config';
import { Network } from '../enums/network';
import { ContractInterface } from '../interfaces/contract-web3.interface';
import { NetWeb3ServiceType } from '../interfaces/init-web3.type';
import { Web3Service } from '../services/web3.service';
import { ContractService } from '../services/contract.service';
import { ParserInfoRepository } from '../repositories/parser-info.repository';
import { QueueWeb3 } from '../enums/queue-web3';

type QueueNameType = { [eventName: string]: string };

@Injectable()
export class Web3Listener {
  /** Initialise web3 listeners */
  public readonly web3!: NetWeb3ServiceType;

  constructor(
    private readonly web3Config: Web3Config,
    private readonly parserRepository: ParserInfoRepository,
    private readonly producerService: ProducerService,
    private readonly logger: LoggerService,
  ) {
    this.web3 = this.initListeners();

    this.rerunWeb3();
  }

  protected initListeners(): NetWeb3ServiceType {
    const web3 = {} as NetWeb3ServiceType;

    for (const net of Object.values(Network)) {
      const provider = this.web3Config.providers[net];

      web3[net] = new Web3Service(
        this.producerService,
        this.logger,
        net,
        provider,
        this.web3Config.privateKey,
      );
    }

    return web3;
  }

  protected async rerunWeb3(): Promise<void> {
    await this.producerService.addMessage(
      QueueWeb3.rerun,
      {
        networks: Object.values(Network),
      },
      ExchangeRabbit.appTopic,
    );
  }

  public listenContract(
    net: Network,
    contractConfig: ContractInterface,
    isSubscribe = true,
    queueEnum: null | [string, string][] = null,
  ): any {
    const contractWeb3Listener = new ContractService(
      this.web3[net],
      contractConfig,
      this.parserRepository,
      this.producerService,
    );

    if (isSubscribe) {
      /** Check event enums if we will subscribe to them */
      queueEnum && this.checkQueueEnum(contractConfig, queueEnum);

      contractWeb3Listener.subscribeToContract();
    }

    return contractWeb3Listener.contract.methods;
  }

  private getQueueNames(contractConfig: ContractInterface): QueueNameType {
    const queueNames: QueueNameType = {};

    const eventNames = contractConfig.abi
      .filter((item) => item.type === 'event' && item.name)
      .map((item) => item.name);

    for (const name of eventNames as string[]) {
      queueNames[name] = `${contractConfig.queuePrefix}.${camelToSnakeCase(
        name,
      )}`;
    }

    return queueNames;
  }

  private checkQueueEnum<T>(
    contractConfig: ContractInterface,
    names: [string, T][],
  ): void {
    const queueNames = this.getQueueNames(contractConfig);

    for (const [key, queue] of names) {
      if (queueNames[key] === String(queue)) {
        delete queueNames[key];
      }
    }

    const stayedNames = Object.entries(queueNames);

    if (!stayedNames.length) {
      return;
    }

    setTimeout(() => {
      const text = stayedNames.reduce(
        (msg, [key, queue]) => msg + `${key} = '${queue}', \n`,
        '\n',
      );

      this.logger.warn(`Maybe need to add Enum for these queues: ${text}`, {
        context: Web3Listener.name,
      });
    }, timeToMs(5, 'second'));
  }
}
