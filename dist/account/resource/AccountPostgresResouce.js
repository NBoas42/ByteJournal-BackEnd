"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountPostgresResource = void 0;
const AccountEntity_1 = require("../entity/AccountEntity");
class AccountPostgresResource {
    static get inject() {
        return ['DBConnection'];
    }
    constructor(dbConnection) {
        this.accountRepository = dbConnection.getRepository(AccountEntity_1.AccountEntity);
    }
    adaptEntityToAccountResponse(accountEntity) {
        return accountEntity;
    }
    async getAccountById(id) {
        const account = await this.accountRepository.findOne({ where: { id } });
        if (!account) {
            // TODO  Add Better Error Handling to add status
            throw new Error('Not Found');
        }
        return this.adaptEntityToAccountResponse(account);
    }
    // TODO Add Specific DTO
    async createAccount(account) {
        const result = await this.accountRepository.save(account);
        if (!result.id) {
            return false;
        }
        return true;
    }
    // TODO Add Specific DTO
    async updateAccountById(id, accountToUpdate) {
        const result = await this.accountRepository.update({ id }, accountToUpdate);
        return result.affected === 1 ? true : false;
    }
    async deleteAccountById(id) {
        const result = await this.accountRepository.delete({ id });
        return result.affected === 1 ? true : false;
    }
}
exports.AccountPostgresResource = AccountPostgresResource;
