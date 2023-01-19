import { AbiItem } from 'web3-utils';

export interface ContractInterface {
  address: string;
  firstBlock: number;
  queuePrefix: string;
  abi: AbiItem[];
  /** Contract events for subscribe (default: allEvents!) */
  events?: string[];
}
