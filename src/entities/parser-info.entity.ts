import { Entity, PrimaryColumn, Column } from 'typeorm';

import { Network } from '../enums/network';

@Entity({ name: 'parser_infos' })
export class ParserInfoEntity {
  @PrimaryColumn({ type: 'varchar' })
  address!: string;

  @PrimaryColumn({ type: 'varchar' })
  net!: Network;

  @Column({ type: 'numeric', nullable: false, width: 35, default: '0' })
  lastBlock = '0';
}
