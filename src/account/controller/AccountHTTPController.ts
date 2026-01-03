import { Request } from "express";

import {AccountPersistenceService} from '../service/AccountPersitenceService';
import { HTTPResponse } from "../../shared/types/HttpResponse";


export class AccountHTTPController {

    accountPersistenceService: AccountPersistenceService;

    static get inject() {
        return ['AccountPersistenceService'];
    }

    constructor( accountPersistenceService: AccountPersistenceService){
        this.accountPersistenceService = accountPersistenceService;
    }

    async getAccountById(request: Request): Promise<HTTPResponse> {
        const params = request.params;
        const requestingAccount = request.requestingAccount;
        const account = await this.accountPersistenceService.getAccountById(params.id, requestingAccount);
        return {
            errors: [],
            status: 200,
            data: account
        }
    }

    async createAccount (request: Request): Promise<HTTPResponse> {
        const accountToCreate = request.body;// TODO Validate With Safe Parse Zod
        const wasCreated = await this.accountPersistenceService.createAccount(accountToCreate);
        return {
            errors: [],
            status: 200,
            data: wasCreated
        }
    }

    async updateAccountById (request: Request): Promise<HTTPResponse> {
        const params = request.params;
        const accountToUpdate = request.body;
        const requestingAccount = request.requestingAccount;// TODO Validate With Safe Parse Zod
        const updatedAccount = await this.accountPersistenceService.updateAccountById(params.id, accountToUpdate, requestingAccount);
        return {
            errors: [],
            status: 200,
            data: updatedAccount
        }
    }

    async deleteAccountById (request: Request): Promise<HTTPResponse> {
        const params  =  request.params;
        const requestingAccount = request.requestingAccount;
        const wasDeleted = await this.accountPersistenceService.deleteAccountById(params.id, requestingAccount);
        return {
            errors: [],
            status: 200,
            data: wasDeleted
        }
        }

}