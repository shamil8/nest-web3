import { Network } from '../enums/network';

export interface BaseSendTransactionInterface {
  contractAddress: string;
  net: Network;
}

export interface EncodeSendTransactionInterface
  extends BaseSendTransactionInterface {
  encodeData: string;
}
