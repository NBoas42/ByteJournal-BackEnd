// orm.ts
import { DataSource } from 'typeorm';
import { AccountEntity } from '../../account/resource/postgres/AccountEntity';
import { JournalEntity } from '../../journal/resource/postgres/entity/JournalEntity';
import { ApplicationConfig } from '../config/config';
import { JournalEntryEntity } from '../../journal/resource/postgres/entity/JournalEntryEntity';
import { NoteEntity } from '../../journal/resource/postgres/entity/NoteEntity';
import { ReviewEntity } from '../../journal/resource/postgres/entity/ReviewEntity';
import { TaskEntity } from '../../journal/resource/postgres/entity/TaskEntity';
import { ScratchPadEntity } from '../../journal/resource/postgres/entity/ScratchPadEntity';

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
