import { Network } from '../../enums/network';

export class UpsertParserCommand {
  public net!: Network;

  public address!: string;

  public lastBlock!: string;
}
