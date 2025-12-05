"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountHTTPController = void 0;
class AccountHTTPController {
    static get inject() {
        return ['AccountPersistenceService'];
    }
    constructor(accountPersistenceService) {
        this.accountPersistenceService = accountPersistenceService;
    }
    // TODO Add Validation to Request
    async getAccountById(request) {
        const { params } = request;
        const account = await this.accountPersistenceService.getAccountById(params.id);
        return {
            errors: [],
            status: 200,
            data: account
        };
    }
    // TODO Add Validation to Request
    // TODO Add Account Role Admin Access Only
    async createAccount(request) {
        const { body } = request; // TODO Probably a better way to deal with this
        const wasCreated = await this.accountPersistenceService.createAccount(body);
        return {
            errors: [],
            status: 200,
            data: wasCreated
        };
    }
    // TODO Add Validation to Request
    async updateAccountById(request) {
        const { params, body } = request; // TODO Probably a better way to deal with this
        const updatedAccount = await this.accountPersistenceService.updateAccountById(params.id, body);
        return {
            errors: [],
            status: 200,
            data: updatedAccount
        };
    }
    // TODO Add Validation to Request
    // TODO Add Account Role Admin Access Only
    // TODO Add soft delete
    async deleteAccountById(request) {
        const { params } = request;
        const wasDeleted = await this.accountPersistenceService.deleteAccountById(params.id);
        return {
            errors: [],
            status: 200,
            data: wasDeleted
        };
    }
}
exports.AccountHTTPController = AccountHTTPController;
