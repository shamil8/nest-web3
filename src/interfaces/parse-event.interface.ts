export type EventCallbackType = (data: any, isWs: boolean) => Promise<void>;

export interface ParseEventInterface {
  parseCallback: EventCallbackType;
  fromBlock: number;
  toBlock?: number | string;
}
