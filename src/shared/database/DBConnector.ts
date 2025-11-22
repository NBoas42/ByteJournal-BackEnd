// orm.ts
import { DataSource } from 'typeorm';
import { AccountEntity } from '../../account/entity/AccountEntity';
import { JournalEntity } from '../../journal/entity/JournalEntity';
import { ApplicationConfig } from '../config/config';
import { JournalEntryEntity } from '../../journal/entity/JournalEntryEntity';
import { NoteEntity } from '../../journal/entity/NoteEntity';
import { ReviewEntity } from '../../journal/entity/ReviewEntity';
import { TaskEntity } from '../../journal/entity/TaskEntity';
import { ScratchPadEntity } from '../../journal/entity/ScratchPadEntity';

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
