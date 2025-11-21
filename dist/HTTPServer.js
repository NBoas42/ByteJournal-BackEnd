"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AccountRoutes_1 = require("./account/http/AccountRoutes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
(0, AccountRoutes_1.registerUserRoutes)(app);
app.listen(8000, () => console.log('running on port 8000'));
