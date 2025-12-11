import { Application } from 'express';

import { expressRequestHandler } from '../../shared/http/ExpressRequestHandler';
import { AuthHTTPController } from '../controller/AuthHttpController';
import { Injector } from 'boxed-injector';


export function registerAuthRoutes (app: Application, injector: Injector) {

    app.post('/v0/auth/login', ( request, response) => {
        const controller: AuthHTTPController = injector.create('AuthHTTPController');
        return expressRequestHandler(request, response, controller.login.bind(controller))
    });
    
}


