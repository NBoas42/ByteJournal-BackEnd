import { Injector } from 'boxed-injector';

import { createDataDBConnection } from '../database/DBConnector';

import { AuthHTTPController } from '../../auth/controller/AuthHttpController';
import { AuthService } from '../../auth/service/AuthService';

import { AccountHTTPController } from '../../account/controller/AccountHTTPController';
import { AccountPersistenceService } from '../../account/service/AccountPersitenceService';
import { AccountPostgresResource } from '../../account/resource/postgres/AccountPostgresResouce';

import { JournalHTTPController } from '../../journal/controller/JournalHttpController';

import { JournalPersistenceService } from '../../journal/service/JournalPersitenceService';
import { JournalEntryPersistenceService } from '../../journal/service/JournalEntryPersitenceService';

import { JournalPostgresResource } from '../../journal/resource/postgres/JournalPostgresResouce';
import { JournalEntryPostgresResource } from '../../journal/resource/postgres/JournalEntryPostgresResource';
import { NotePostgresResource } from '../../journal/resource/postgres/NotePostgresResource';
import { TaskPostgresResource } from '../../journal/resource/postgres/TaskPostgresResource';
import { ReviewPostgresResource } from '../../journal/resource/postgres/ReviewPostgresResource';


let injector: Injector | undefined;

async function buildInjector(): Promise<Injector> {
  const inj = new Injector();

  // Init Database Connection
  const dbConnection = await createDataDBConnection();
  inj.register('DBConnection', dbConnection)

  // Auth Module
  inj.factory('AuthHTTPController', AuthHTTPController);
  inj.factory('AuthService', AuthService);

  // Account Module
  inj.factory('AccountHTTPController', AccountHTTPController);
  inj.factory('AccountPersistenceService', AccountPersistenceService);
  inj.factory('AccountPostgresResource', AccountPostgresResource);

  // Journal Module
  inj.factory('JournalHTTPController', JournalHTTPController);
  inj.factory('JournalPersistenceService', JournalPersistenceService);
  inj.factory('JournalEntryPersistenceService', JournalEntryPersistenceService);
  inj.factory('JournalPostgresResource', JournalPostgresResource);
  inj.factory('JournalEntryPostgresResource', JournalEntryPostgresResource);
  inj.factory('NotePostgresResource', NotePostgresResource);
  inj.factory('TaskPostgresResource', TaskPostgresResource);
  inj.factory('ReviewPostgresResource', ReviewPostgresResource);

  return inj;
}

export async function initInjector(): Promise<Injector> {
  if (!injector) {
    injector = await buildInjector();
  }
  return injector;
}