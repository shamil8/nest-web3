import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ParserInfoEntity } from '../entities/parser-info.entity';
import { UpsertParserCommand } from '../dto/command/upsert-parser.command';

@Injectable()
export class ParserInfoRepository {
  constructor(
    @InjectRepository(ParserInfoEntity)
    private readonly parserRepository: Repository<ParserInfoEntity>,
  ) {}

  async getParserInfo(params: UpsertParserCommand): Promise<ParserInfoEntity> {
    const parser = await this.parserRepository.findOne({
      where: { net: params.net, address: params.address },
    });

    if (!parser) {
      return this.storeParserInfo(params);
    }

    return parser;
  }

  async storeParserInfo(
    command: UpsertParserCommand,
  ): Promise<ParserInfoEntity> {
    return await this.parserRepository.save(command);
  }
}
