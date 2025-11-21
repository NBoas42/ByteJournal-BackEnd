"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountHTTPController = void 0;
const AccountPersitenceService_1 = require("../service/AccountPersitenceService");
class AccountHTTPController {
    constructor() {
        this.accountPersistenceService = new AccountPersitenceService_1.AccountPersistenceService();
    }
    async getAccountById(request) {
        const { params } = request;
        const account = this.accountPersistenceService.getAccountById(params.id);
        return {
            errors: [],
            status: 200,
            data: account
        };
    }
    async createAccount(request) {
        return {
            errors: [],
            status: 200,
            data: {}
        };
    }
    async updateAccountById(request) {
        return {
            errors: [],
            status: 200,
            data: {}
        };
    }
    async deleteAccountById(request) {
        return {
            errors: [],
            status: 200,
            data: {}
        };
    }
}
exports.AccountHTTPController = AccountHTTPController;
