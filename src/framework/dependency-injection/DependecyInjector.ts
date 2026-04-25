import { Injector } from 'boxed-injector';

import { createDataDBConnection } from '../database/DBConnector';

import { AuthHTTPController } from '../../modules/auth/controller/AuthHttpController';
import { AuthService } from '../../modules/auth/service/AuthService';

import { AccountHTTPController } from '../../modules/account/controller/AccountHTTPController';
import { AccountPersistenceService } from '../../modules/account/service/AccountPersitenceService';
import { AccountPostgresResource } from '../../modules/account/resource/postgres/AccountPostgresResouce';

import { JournalHTTPController } from '../../modules/journal/controller/JournalHttpController';

import { JournalPersistenceService } from '../../modules/journal/service/JournalPersitenceService';
import { JournalEntryPersistenceService } from '../../modules/journal/service/JournalEntryPersitenceService';

import { JournalPostgresResource } from '../../modules/journal/resource/postgres/JournalPostgresResouce';
import { JournalEntryPostgresResource } from '../../modules/journal/resource/postgres/JournalEntryPostgresResource';
import { NotePostgresResource } from '../../modules/journal/resource/postgres/NotePostgresResource';
import { TaskPostgresResource } from '../../modules/journal/resource/postgres/TaskPostgresResource';
import { ReviewPostgresResource } from '../../modules/journal/resource/postgres/ReviewPostgresResource';


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