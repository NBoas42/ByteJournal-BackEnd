import { Injector } from 'boxed-injector';

import { createDataDBConnection } from '../database/DBConnector';

import { AccountHTTPController } from '../../account/controller/AccountHTTPController';
import { AccountPersistenceService } from '../../account/service/AccountPersitenceService';
import { AccountPostgresResource } from '../../account/resource/AccountPostgresResouce';

import { JournalHTTPController } from '../../journal/controller/JournalHttpController';
import { JournalPersistenceService } from '../../journal/service/JournalPersitenceService';
import { JournalPostgresResource } from '../../journal/resource/JournalPostgresResouce';

let injector: Injector | undefined;

async function buildInjector(): Promise<Injector> {
  const inj = new Injector();

  // Init Database Connection
  const dbConnection = await createDataDBConnection();
  inj.register('DBConnection', dbConnection)


  // Init Account Module
  inj.factory('AccountHTTPController', AccountHTTPController);
  inj.factory('AccountPersistenceService', AccountPersistenceService);
  inj.factory('AccountPostgresResource', AccountPostgresResource);

  // Init Journal Module
  inj.factory('JournalHTTPController', JournalHTTPController);
  inj.factory('JournalPersistenceService', JournalPersistenceService);
  inj.factory('JournalPostgresResource', JournalPostgresResource);

  return inj;
}

export async function initInjector(): Promise<Injector> {
  if (!injector) {
    injector = await buildInjector();
  }
  return injector;
}