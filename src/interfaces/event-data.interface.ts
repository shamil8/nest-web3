export interface EventContractInterface {
  address: string;
  blockNumber: number;
  transactionHash: string;
  event: string;
  signature: string;
  returnValues: {
    [key: string]: any;
  };
}

export interface EventDataInterface extends EventContractInterface {
  raw?: {
    data: string;
    topics: string[];
  };
  logIndex?: number;
  transactionIndex?: number;
  blockHash?: boolean;
  removed?: string;
  id?: string;
}
