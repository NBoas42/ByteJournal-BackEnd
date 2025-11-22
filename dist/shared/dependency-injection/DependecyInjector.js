"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInjector = getInjector;
const boxed_injector_1 = require("boxed-injector");
const AccountHTTPController_1 = require("../../account/controller/AccountHTTPController");
const AccountPersitenceService_1 = require("../../account/service/AccountPersitenceService");
const DBConnector_1 = require("../database/DBConnector");
let injector;
async function buildInjector() {
    const inj = new boxed_injector_1.Injector();
    // Init Database
    const dbConnection = await (0, DBConnector_1.createDataDBConnection)();
    inj.register('DBConnection', dbConnection);
    // Init Account
    inj.factory('AccountHTTPController', AccountHTTPController_1.AccountHTTPController);
    inj.factory('AccountPersistenceService', AccountPersitenceService_1.AccountPersistenceService);
    return inj;
}
async function getInjector() {
    if (!injector) {
        injector = await buildInjector();
    }
    return injector;
}
