"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserRoutes = registerUserRoutes;
const ExpressRequestHandler_1 = require("../../shared/http/ExpressRequestHandler");
const AccountHTTPController_1 = require("../controller/AccountHTTPController");
const controller = new AccountHTTPController_1.AccountRESTController();
function registerUserRoutes(app) {
    app.get('/v0/account/{id}', (request, response) => (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.getAccountById));
    app.post('/v0/account', (request, response) => (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.createAccount));
    app.patch('/v0/account/{id}', (request, response) => (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.updateAccountById));
    app.delete('/v0/account/{id}', (request, response) => (0, ExpressRequestHandler_1.expressRequestHandler)(request, response, controller.getAccountById));
}
