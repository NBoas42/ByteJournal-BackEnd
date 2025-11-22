"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
require("reflect-metadata");
const AccountRoutes_1 = require("./account/http/AccountRoutes");
const DependecyInjector_1 = require("./shared/dependency-injection/DependecyInjector");
const bootstrap = async () => {
    const app = (0, express_1.default)();
    const injector = await (0, DependecyInjector_1.getInjector)();
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    (0, AccountRoutes_1.registerUserRoutes)(app, injector);
    app.listen(8000, () => console.log('running on port 8000'));
};
bootstrap();
