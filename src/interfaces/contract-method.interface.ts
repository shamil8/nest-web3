import {
  CallOptions,
  EstimateGasOptions,
  SendOptions,
} from 'web3-eth-contract';
import { PromiEvent, TransactionReceipt } from 'web3-core';

export interface TransactionMethodInterface {
  _method: { name: string };
  _parent: { _address: string };

  send(
    options: SendOptions,
    callback?: (err: Error, transactionHash: string) => void,
  ): PromiEvent<TransactionReceipt>;

  estimateGas(options: EstimateGasOptions): Promise<number>;

  encodeABI(): string;

  arguments: string[];
}

export type ViewMethodType<T = string> = () => {
  call(options?: CallOptions): Promise<T>;
};
