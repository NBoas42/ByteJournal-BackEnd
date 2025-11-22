import { Application } from 'express';

import { expressRequestHandler } from '../../shared/http/ExpressRequestHandler';
import { AccountHTTPController } from '../controller/AccountHTTPController';
import { Injector } from 'boxed-injector';


export function registerUserRoutes (app: Application, injector: Injector) {

    app.get('/v0/account/:id', ( request, response) => {
        const controller: AccountHTTPController = injector.get('AccountHTTPController');
        return expressRequestHandler(request, response, controller.getAccountById.bind(controller))
    });

    app.post('/v0/account', ( request, response ) => {
        const controller: AccountHTTPController = injector.get('AccountHTTPController');
        return expressRequestHandler(request, response, controller.createAccount.bind(controller))
    });

    app.patch('/v0/account/:id', ( request, response ) => {
        const controller: AccountHTTPController = injector.get('AccountHTTPController');
        return expressRequestHandler(request, response, controller.updateAccountById.bind(controller))
    });

    app.delete('/v0/account/:id', ( request, response ) => {
        const controller: AccountHTTPController = injector.get('AccountHTTPController');
        return expressRequestHandler(request, response, controller.getAccountById.bind(controller))
    });
    
}


