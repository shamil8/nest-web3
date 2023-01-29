import { Network } from '../enums/network';

export interface ProviderInterface {
  url: string;
  parseLimit: number;
}

export interface ProviderWeb3Interface {
  [Network.ETH]: ProviderInterface;
  [Network.MATIC]: ProviderInterface;
  [Network.BSC]: ProviderInterface;
}
