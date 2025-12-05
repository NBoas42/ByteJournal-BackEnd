"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserRoutes = registerUserRoutes;
const ExpressRequestHandler_1 = require("../../shared/http/ExpressRequestHandler");
function registerUserRoutes(app, injector) {
    app.get('/v0/account/:id', (request, response) => {
        const controller = injector.create('AccountHTTPController');
        return (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.getAccountById.bind(controller));
    });
    app.post('/v0/account', (request, response) => {
        const controller = injector.create('AccountHTTPController');
        return (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.createAccount.bind(controller));
    });
    app.patch('/v0/account/:id', (request, response) => {
        const controller = injector.create('AccountHTTPController');
        return (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.updateAccountById.bind(controller));
    });
    app.delete('/v0/account/:id', (request, response) => {
        const controller = injector.create('AccountHTTPController');
        return (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.deleteAccountById.bind(controller));
    });
}
