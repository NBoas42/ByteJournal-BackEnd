import { Application } from 'express';

import { expressRequestHandler } from '../../shared/http/ExpressRequestHandler';
import { UserRESTController } from '../controller/UserRESTController';

const controller = new UserRESTController(); 

export function registerUserRoutes (app: Application) {

    app.get('/v0/user/{id}', (request, response) => expressRequestHandler(request,response, controller.getUserById));

    app.post('/v0/user', (request, response ) => expressRequestHandler(request,response, controller.getUserById));

    app.patch('/v0/user/{id}', (request, response ) => expressRequestHandler(request,response, controller.getUserById));

    app.delete('/v0/user/{id}', (request, response ) => expressRequestHandler(request,response, controller.getUserById));
}


