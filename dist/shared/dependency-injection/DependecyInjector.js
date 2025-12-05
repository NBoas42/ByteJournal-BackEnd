"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initInjector = initInjector;
const boxed_injector_1 = require("boxed-injector");
const DBConnector_1 = require("../database/DBConnector");
const AccountHTTPController_1 = require("../../account/controller/AccountHTTPController");
const AccountPersitenceService_1 = require("../../account/service/AccountPersitenceService");
const AccountPostgresResouce_1 = require("../../account/resource/AccountPostgresResouce");
const JournalHttpController_1 = require("../../journal/controller/JournalHttpController");
const JournalPersitenceService_1 = require("../../journal/service/JournalPersitenceService");
const JournalEntryPersitenceService_1 = require("../../journal/service/JournalEntryPersitenceService");
const JournalPostgresResouce_1 = require("../../journal/resource/JournalPostgresResouce");
const JournalEntryPostgresResource_1 = require("../../journal/resource/JournalEntryPostgresResource");
let injector;
async function buildInjector() {
    const inj = new boxed_injector_1.Injector();
    // Init Database Connection
    const dbConnection = await (0, DBConnector_1.createDataDBConnection)();
    inj.register('DBConnection', dbConnection);
    // Init Account Module
    inj.factory('AccountHTTPController', AccountHTTPController_1.AccountHTTPController);
    inj.factory('AccountPersistenceService', AccountPersitenceService_1.AccountPersistenceService);
    inj.factory('AccountPostgresResource', AccountPostgresResouce_1.AccountPostgresResource);
    // Init Journal Module
    inj.factory('JournalHTTPController', JournalHttpController_1.JournalHTTPController);
    inj.factory('JournalPersistenceService', JournalPersitenceService_1.JournalPersistenceService);
    inj.factory('JournalEntryPersistenceService', JournalEntryPersitenceService_1.JournalEntryPersistenceService);
    inj.factory('JournalPostgresResource', JournalPostgresResouce_1.JournalPostgresResource);
    inj.factory('JournalEntryPostgresResource', JournalEntryPostgresResource_1.JournalEntryPostgresResource);
    return inj;
}
async function initInjector() {
    if (!injector) {
        injector = await buildInjector();
    }
    return injector;
}
