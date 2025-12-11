import { Application } from 'express';

import { expressRequestHandler } from '../../shared/http/ExpressRequestHandler';
import { AccountHTTPController } from '../controller/AccountHTTPController';
import { Injector } from 'boxed-injector';
import { authMiddleware } from '../../shared/middleware/authMiddleWare';


export function registerAccountRoutes (app: Application, injector: Injector) {
        const auth = authMiddleware(injector);
    
    app.get('/v0/account/:id', auth,  ( request, response) => {
        const controller: AccountHTTPController = injector.create('AccountHTTPController');
        return expressRequestHandler(request, response, controller.getAccountById.bind(controller))
    });

    app.post('/v0/account', auth,  ( request, response ) => {
        const controller: AccountHTTPController = injector.create('AccountHTTPController');
        return expressRequestHandler(request, response, controller.createAccount.bind(controller))
    });

    app.patch('/v0/account/:id', auth,  ( request, response ) => {
        const controller: AccountHTTPController = injector.create('AccountHTTPController');
        return expressRequestHandler(request, response, controller.updateAccountById.bind(controller))
    });

    app.delete('/v0/account/:id', auth,  ( request, response ) => {
        const controller: AccountHTTPController = injector.create('AccountHTTPController');
        return expressRequestHandler(request, response, controller.deleteAccountById.bind(controller))
    });
    
}


