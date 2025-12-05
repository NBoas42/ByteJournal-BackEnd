"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerJournalRoutes = registerJournalRoutes;
const ExpressRequestHandler_1 = require("../../shared/http/ExpressRequestHandler");
function registerJournalRoutes(app, injector) {
    // <---------Journal-------------->
    app.get('/v0/journal', (request, response) => {
        const controller = injector.create('JournalHTTPController');
        return (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.searchJournal.bind(controller));
    });
    app.get('/v0/journal/:id', (request, response) => {
        const controller = injector.create('JournalHTTPController');
        return (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.getJournalById.bind(controller));
    });
    app.post('/v0/journal', (request, response) => {
        const controller = injector.create('JournalHTTPController');
        return (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.createJournal.bind(controller));
    });
    app.patch('/v0/journal/:id', (request, response) => {
        const controller = injector.create('JournalHTTPController');
        return (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.updateJournalById.bind(controller));
    });
    app.delete('/v0/journal/:id', (request, response) => {
        const controller = injector.create('JournalHTTPController');
        return (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.deleteJournalById.bind(controller));
    });
    // <---------Journal Entry-------------->
    app.get('/v0/journal/:id/journal-entry', (request, response) => {
        const controller = injector.create('JournalHTTPController');
        return (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.searchJournal.bind(controller));
    });
    app.get('/v0/journal/:id/journal-entry/:journalEntryId', (request, response) => {
        const controller = injector.create('JournalHTTPController');
        return (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.getJournalById.bind(controller));
    });
    app.post('/v0/journal/:id/journal-entry', (request, response) => {
        const controller = injector.create('JournalHTTPController');
        return (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.createJournal.bind(controller));
    });
    app.patch('/v0/journal/:id/journal-entry/:journalEntryId', (request, response) => {
        const controller = injector.create('JournalHTTPController');
        return (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.updateJournalById.bind(controller));
    });
    app.delete('/v0/journal/:id/journal-entry/:journalEntryId', (request, response) => {
        const controller = injector.create('JournalHTTPController');
        return (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.deleteJournalById.bind(controller));
    });
}
