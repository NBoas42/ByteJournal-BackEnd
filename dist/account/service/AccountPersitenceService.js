"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountPersistenceService = void 0;
class AccountPersistenceService {
    static get inject() {
        return ['AccountPostgresResource'];
    }
    constructor(accountPostgresResource) {
        this.accountPostgresResource = accountPostgresResource;
    }
    async getAccountById(id) {
        return this.accountPostgresResource.getAccountById(id);
    }
    // TODO Create a Default Journal 
    async createAccount(accountToCreate) {
        return this.accountPostgresResource.createAccount(accountToCreate);
    }
    async updateAccountById(id, accountToUpdate) {
        return this.accountPostgresResource.updateAccountById(id, accountToUpdate);
    }
    async deleteAccountById(id) {
        return this.accountPostgresResource.deleteAccountById(id);
    }
}
exports.AccountPersistenceService = AccountPersistenceService;
