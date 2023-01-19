import { Network } from '../enums/network';
import { Web3Service } from '../services/web3.service';

export type NetWeb3ServiceType = {
  [net in Network]: Web3Service;
};
