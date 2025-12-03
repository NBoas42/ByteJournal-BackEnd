import { Application } from 'express';

import { expressRequestHandler } from '../../shared/http/ExpressRequestHandler';
import { JournalHTTPController } from '../controller/JournalHttpController';
import { Injector } from 'boxed-injector';


export function registerJournalRoutes (app: Application, injector: Injector) {

    app.get('/v0/journal/:id', ( request, response) => {
        const controller: JournalHTTPController = injector.create('JournalHTTPController');
        return expressRequestHandler(request, response, controller.getJournalById.bind(controller))
    });

    app.post('/v0/journal', ( request, response ) => {
        const controller: JournalHTTPController = injector.create('AccountHTTPController');
        return expressRequestHandler(request, response, controller.createJournal.bind(controller))
    });

    app.patch('/v0/journal/:id', ( request, response ) => {
        const controller: JournalHTTPController = injector.create('AccountHTTPController');
        return expressRequestHandler(request, response, controller.updateJournalById.bind(controller))
    });

    app.delete('/v0/journal/:id', ( request, response ) => {
        const controller: JournalHTTPController = injector.create('AccountHTTPController');
        return expressRequestHandler(request, response, controller.deleteJournalById.bind(controller))
    });
    
}


