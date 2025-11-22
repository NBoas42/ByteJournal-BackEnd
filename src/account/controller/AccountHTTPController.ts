import { Request } from "express";

import {AccountPersistenceService} from '../service/AccountPersitenceService';
import { HTTPResponse } from "../../shared/http/types";


export class AccountHTTPController {

    accountPersistenceService: AccountPersistenceService;
    state = 'State';// TODO The state is persited the way I have it

    static get inject() {
        return ['AccountPersistenceService'];
    }

    constructor( accountPersistenceService: AccountPersistenceService){
        this.accountPersistenceService = accountPersistenceService;
    }

    async getAccountById(request: Request): Promise<HTTPResponse> {
        console.log(this.state);
        this.state = "Changed State";
        const { params } =  request;
        const account = await this.accountPersistenceService.getAccountById(params.id);
        return {
            errors: [],
            status: 200,
            data: account
        }
    }

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
        const { params, body } = request;// TODO Probably a better way to deal with this
        const updatedAccount = await this.accountPersistenceService.updateAccountById(params.id, body);
        return {
            errors: [],
            status: 200,
            data: updatedAccount
        }
    }

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