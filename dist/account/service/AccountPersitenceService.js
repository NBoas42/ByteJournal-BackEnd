"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountPersistenceService = void 0;
class AccountPersistenceService {
    async getAccountById(id) {
        return {
            id: id,
        };
    }
    async createAccount(account) {
        const isSuccessful = true;
        return isSuccessful;
    }
    async updateAccountById(id) {
        return {};
    }
    async deleteAccountById(id) {
        const isSuccessful = true;
        return isSuccessful;
    }
}
exports.AccountPersistenceService = AccountPersistenceService;
