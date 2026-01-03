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

    // TODO Add Validation to Request
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

    // TODO Add Validation to Request
    // TODO Add Account Role Admin Access Only
    async createAccount (request: Request): Promise<HTTPResponse> {
        const { body } = request;// TODO Probably a better way to deal with this
        const wasCreated = await this.accountPersistenceService.createAccount(body);
        return {
            errors: [],
            status: 200,
            data: wasCreated
        }
    }

    async updateAccountById (request: Request): Promise<HTTPResponse> {
        const params = request.params;
        const accountToUpdate = request.body;
        const requestingAccount = request.requestingAccount;
        const updatedAccount = await this.accountPersistenceService.updateAccountById(params.id, accountToUpdate, requestingAccount);
        return {
            errors: [],
            status: 200,
            data: updatedAccount
        }
    }

    // TODO Add Validation to Request
    // TODO Add soft delete
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