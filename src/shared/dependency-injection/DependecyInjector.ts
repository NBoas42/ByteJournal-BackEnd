import { Injector } from 'boxed-injector';
import { AccountHTTPController } from '../../account/controller/AccountHTTPController';
import { AccountPersistenceService } from '../../account/service/AccountPersitenceService';
import { createDataDBConnection } from '../database/DBConnector';
import { AccountPostgresResource } from '../../account/resource/AccountPostgresResouce';

let injector: Injector | undefined;

async function buildInjector(): Promise<Injector> {
  const inj = new Injector();

  // Init Database
  const dbConnection = await createDataDBConnection();
  inj.register('DBConnection', dbConnection)


  // Init Account
  inj.factory('AccountHTTPController', AccountHTTPController);
  inj.factory('AccountPersistenceService', AccountPersistenceService);
  inj.factory('AccountPostgresResource', AccountPostgresResource);
  return inj;
}

export async function getInjector(): Promise<Injector> {
  if (!injector) {
    injector = await buildInjector();
  }
  return injector;
}