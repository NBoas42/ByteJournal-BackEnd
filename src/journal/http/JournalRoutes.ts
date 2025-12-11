import { Application } from 'express';

import { expressRequestHandler } from '../../shared/http/ExpressRequestHandler';
import { JournalHTTPController } from '../controller/JournalHttpController';
import { Injector } from 'boxed-injector';
import { authMiddleware } from '../../shared/middleware/authMiddleWare';


export function registerJournalRoutes (app: Application, injector: Injector) {
    const auth = authMiddleware(injector);

    // <---------Journal-------------->
    app.get('/v0/journal', auth, ( request, response) => {
        const controller: JournalHTTPController = injector.create('JournalHTTPController');
        return expressRequestHandler(request, response, controller.searchJournal.bind(controller))
    });

    app.get('/v0/journal/:id', auth, ( request, response) => {
        const controller: JournalHTTPController = injector.create('JournalHTTPController');
        return expressRequestHandler(request, response, controller.getJournalById.bind(controller))
    });
    
    app.post('/v0/journal', auth ,( request, response ) => {
        const controller: JournalHTTPController = injector.create('JournalHTTPController');
        return expressRequestHandler(request, response, controller.createJournal.bind(controller))
    });

    app.patch('/v0/journal/:id', auth, ( request, response ) => {
        const controller: JournalHTTPController = injector.create('JournalHTTPController');
        return expressRequestHandler(request, response, controller.updateJournalById.bind(controller))
    });

    app.delete('/v0/journal/:id', auth, ( request, response ) => {
        const controller: JournalHTTPController = injector.create('JournalHTTPController');
        return expressRequestHandler(request, response, controller.deleteJournalById.bind(controller))
    });

    // <---------Journal Entry-------------->
    app.get('/v0/journal/:journalId/journal-entry', auth, ( request, response) => {
        const controller: JournalHTTPController = injector.create('JournalHTTPController');
        return expressRequestHandler(request, response, controller.searchJournalEntry.bind(controller))
    });

    app.get('/v0/journal/:journalId/journal-entry/:journalEntryId', auth, ( request, response) => {
        const controller: JournalHTTPController = injector.create('JournalHTTPController');
        return expressRequestHandler(request, response, controller.getJournalEntryById.bind(controller))
    });

    app.post('/v0/journal/:journalId/journal-entry', auth, ( request, response ) => {
        const controller: JournalHTTPController = injector.create('JournalHTTPController');
        return expressRequestHandler(request, response, controller.createJournalEntry.bind(controller))
    });

    app.patch('/v0/journal/:journalId/journal-entry/:journalEntryId', auth, ( request, response ) => {
        const controller: JournalHTTPController = injector.create('JournalHTTPController');
        return expressRequestHandler(request, response, controller.updateJournalEntryById.bind(controller))
    });

    app.delete('/v0/journal/:journalId/journal-entry/:journalEntryId', auth, ( request, response ) => {
        const controller: JournalHTTPController = injector.create('JournalHTTPController');
        return expressRequestHandler(request, response, controller.deleteJournalEntryById.bind(controller))
    });
    
    
}


