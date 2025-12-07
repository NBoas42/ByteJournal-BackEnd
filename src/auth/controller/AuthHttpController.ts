import { Request } from "express";

import { HTTPResponse } from "../../shared/http/types";
import { AuthService } from "../service/AuthService";


export class AuthHTTPController {

    authService: AuthService;

    static get inject() {
        return ['AuthService'];
    }

    constructor( authService: AuthService){
        this.authService = authService;
    }

    async login(request: Request): Promise<HTTPResponse> {
        const { body } =  request;
        const account = await this.authService.login(body.email, body.password);
        return {
            errors: [],
            status: 200,
            data: account
        }
    }

}