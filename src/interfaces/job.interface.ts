import { EventContractInterface } from './event-data.interface';
import { Network } from '../enums/network';

export interface JobInterface extends EventContractInterface {
  isWs: boolean;
  net: Network;
}
