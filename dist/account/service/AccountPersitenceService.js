"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountPersistenceService = void 0;
const AccountEntity_1 = require("../entity/AccountEntity");
class AccountPersistenceService {
    static get inject() {
        return ['DBConnection'];
    }
    constructor(dbConnection) {
        this.accountRepository = dbConnection.getRepository(AccountEntity_1.AccountEntity);
    }
    async getAccountById(id) {
        const result = await this.accountRepository.findOne({ where: { id } });
        return result;
    }
    async createAccount(account) {
        const isSuccessful = true;
        console.log(account);
        return isSuccessful;
    }
    async updateAccountById(id, accountToUpdate) {
        console.log(accountToUpdate);
        return {
            ...accountToUpdate,
            id: id,
        };
    }
    async deleteAccountById(id) {
        const isSuccessful = true;
        console.log(id);
        return isSuccessful;
    }
}
exports.AccountPersistenceService = AccountPersistenceService;
