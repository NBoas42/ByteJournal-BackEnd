import { Request } from "express";

import {AccountPersistenceService} from '../service/AccountPersitenceService';
import { HTTPResponse } from "../../shared/http/types";


export class AccountHTTPController {

    accountPersistenceService: AccountPersistenceService;
    state = 'State';

    static get inject() {
        return ['AccountPersistenceService'];
    }

    constructor( accountPersistenceService: AccountPersistenceService){
        this.accountPersistenceService = accountPersistenceService;
    }

    // TODO Add Validation to Request
    async getAccountById(request: Request): Promise<HTTPResponse> {
        const { params } =  request;
        const account = await this.accountPersistenceService.getAccountById(params.id);
        return {
            errors: [],
            status: 200,
            data: account
        }
    }

    // TODO Add Validation to Request
    async createAccount (request: Request): Promise<HTTPResponse> {
        const { body } = request;// TODO Probably a better way to deal with this
        const wasCreated = await this.accountPersistenceService.createAccount(body);
        return {
            errors: [],
            status: 200,
            data: wasCreated
        }
    }

    // TODO Add Validation to Request
    async updateAccountById (request: Request): Promise<HTTPResponse> {
        const { params, body } = request;// TODO Probably a better way to deal with this
        const updatedAccount = await this.accountPersistenceService.updateAccountById(params.id, body);
        return {
            errors: [],
            status: 200,
            data: updatedAccount
        }
    }

    // TODO Add Validation to Request
    async deleteAccountById (request: Request): Promise<HTTPResponse> {
        const { params } =  request;
        const wasDeleted = await this.accountPersistenceService.deleteAccountById(params.id);
        
        return {
            errors: [],
            status: 200,
            data: wasDeleted
        }
    }

}