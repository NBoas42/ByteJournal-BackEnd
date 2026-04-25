// orm.ts
import { DataSource } from 'typeorm';
import { AccountEntity } from '../../modules/account/resource/postgres/AccountEntity';
import { JournalEntity } from '../../modules/journal/resource/postgres/entity/JournalEntity';
import { ApplicationConfig } from '../config/config';
import { JournalEntryEntity } from '../../modules/journal/resource/postgres/entity/JournalEntryEntity';
import { NoteEntity } from '../../modules/journal/resource/postgres/entity/NoteEntity';
import { ReviewEntity } from '../../modules/journal/resource/postgres/entity/ReviewEntity';
import { TaskEntity } from '../../modules/journal/resource/postgres/entity/TaskEntity';
import { ScratchPadEntity } from '../../modules/journal/resource/postgres/entity/ScratchPadEntity';

const applicationConfig: ApplicationConfig = require('../config/config.json');

export async function createDataDBConnection(): Promise<DataSource> {
  const dataSource = new DataSource({
    type: applicationConfig.database.type,
    host: applicationConfig.database.host,
    port: applicationConfig.database.port,
    username: applicationConfig.database.userName,
    password: applicationConfig.database.password,
    database: applicationConfig.database.name, 
    entities: [
      AccountEntity,
      JournalEntity,
      ScratchPadEntity,
      JournalEntryEntity,
      NoteEntity,
      ReviewEntity,
      TaskEntity,
    ],
    synchronize: false,
    logging: false,
  });

  return dataSource.initialize();
}
