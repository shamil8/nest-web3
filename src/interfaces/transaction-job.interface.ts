import { Transaction } from 'web3-core';

import { Network } from '../enums/network';

export interface TransactionJobInterface extends Transaction {
  net: Network;
  walletAddress: string;
}
