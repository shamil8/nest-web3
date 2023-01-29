import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Network } from '../enums/network';
import { ProviderWeb3Interface } from '../interfaces/provider-web3.interface';

@Injectable()
export class Web3Config {
  /**
   * Providers wss or rpc with parse limit
   */
  public providers: ProviderWeb3Interface;

  /** add privateKey if you will send transactions */
  public readonly privateKey?: string;

  constructor(private configService: ConfigService) {
    this.providers = {
      [Network.ETH]: {
        url: this.configService.get<string>(
          'PROVIDER_ETH',
          'wss://eth-mainnet.nodereal.io/ws/v1/1659dfb40aa24bbb8153a677b98064d7',
        ),
        parseLimit: this.configService.get<number>('PROVIDER_ETH_LIMIT', 4000),
      },
      [Network.MATIC]: {
        url: this.configService.get<string>(
          'PROVIDER_MATIC',
          'https://polygon.llamarpc.com',
        ),
        parseLimit: this.configService.get<number>(
          'PROVIDER_MATIC_LIMIT',
          4000,
        ),
      },
      [Network.BSC]: {
        url: this.configService.get<string>(
          'PROVIDER_BSC',
          'wss://bsc-mainnet.nodereal.io/ws/v1/64a9df0874fb4a93b9d0a3849de012d3',
        ),
        parseLimit: this.configService.get<number>('PROVIDER_BSC_LIMIT', 4000),
      },
    };

    this.privateKey = this.configService.get<string>('WEB3_PRIVATE_KEY');
  }
}
