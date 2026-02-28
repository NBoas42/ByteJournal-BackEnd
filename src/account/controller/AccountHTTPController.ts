import { Request } from "express";

import { AccountPersistenceService } from "../service/AccountPersitenceService";
import { HTTPResponse } from "../../shared/types/HttpResponse";

import { CreateAccountRequestSchema } from "../types/CreateAccountRequest";
import { UpdateAccountRequestSchema } from "../types/UpdateAccountRequest";

export class AccountHTTPController {
  accountPersistenceService: AccountPersistenceService;

  static get inject() {
    return ["AccountPersistenceService"];
  }

  constructor(accountPersistenceService: AccountPersistenceService) {
    this.accountPersistenceService = accountPersistenceService;
  }

  async getAccountById(request: Request): Promise<HTTPResponse> {
    const params = request.params;
    const requestingAccount = request.requestingAccount; // This seems confusing on first read how do I make it more clear this comes in from the middle ware

    return {
      errors: [],
      status: 200,
      data: await this.accountPersistenceService.getAccountById(
            params.id,
            requestingAccount
        ),
    };
  }

  async createAccount(request: Request): Promise<HTTPResponse> {
    const createAccountRequest = CreateAccountRequestSchema.safeParse(
      request.body
    );

    if (createAccountRequest.success === false) {
      throw new Error("INVALID_REQUEST");
    }

    return {
      errors: [],
      status: 200,
      data: await this.accountPersistenceService.createAccount(
            createAccountRequest.data
        ),
    };
  }

  async updateAccountById(request: Request): Promise<HTTPResponse> {
    const params = request.params;
    const requestingAccount = request.requestingAccount;
    const updateAccountRequest = UpdateAccountRequestSchema.safeParse(
      request.body
    );

    if (updateAccountRequest.success === false) {
      throw new Error("INVALID_REQUEST");
    }

    return {
      errors: [],
      status: 200,
      data: await this.accountPersistenceService.updateAccountById(
            params.id,
            updateAccountRequest.data,
            requestingAccount
        ),
    };
  }

  async deleteAccountById(request: Request): Promise<HTTPResponse> {
    const params = request.params;
    const requestingAccount = request.requestingAccount;
    return {
      errors: [],
      status: 200,
      data: await this.accountPersistenceService.deleteAccountById(
            params.id,
            requestingAccount
        ),
    };
  }
}
