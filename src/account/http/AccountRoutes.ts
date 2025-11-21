import { Application } from 'express';

import { expressRequestHandler } from '../../shared/http/ExpressRequestHandler';
import { AccountHTTPController } from '../controller/AccountHTTPController';

// TO DO Add in Dependency Injection
const controller = new AccountHTTPController(); 

export function registerUserRoutes (app: Application) {

    app.get('/v0/account/:id', ( request, response) => expressRequestHandler(request, response, controller.getAccountById.bind(controller)));

    app.post('/v0/account', ( request, response ) => expressRequestHandler(request, response, controller.createAccount.bind(controller)));

    app.patch('/v0/account/:id', ( request, response ) => expressRequestHandler(request, response, controller.updateAccountById.bind(controller)));

    app.delete('/v0/account/:id', ( request, response ) => expressRequestHandler(request, response, controller.getAccountById.bind(controller)));
    
}


