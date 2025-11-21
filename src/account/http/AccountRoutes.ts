import { Application } from 'express';

import { expressRequestHandler } from '../../shared/http/ExpressRequestHandler';
import { AccountHTTPController } from '../controller/AccountHTTPController';

const controller = new AccountHTTPController(); 

export function registerUserRoutes (app: Application) {

    app.get('/v0/account/{id}', (request, response) => expressRequestHandler(request, response, controller.getAccountById));

    app.post('/v0/account', (request, response ) => expressRequestHandler(request, response, controller.createAccount));

    app.patch('/v0/account/{id}', (request, response ) => expressRequestHandler(request, response, controller.updateAccountById));

    app.delete('/v0/account/{id}', (request, response ) => expressRequestHandler(request, response, controller.getAccountById));
    
}


