import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import "reflect-metadata"

import { initInjector } from './framework/dependency-injection/DependecyInjector';

import { registerAccountRoutes } from './modules/account/http/AccountRoutes';
import { registerJournalRoutes } from './modules/journal/http/JournalRoutes';
import { registerAuthRoutes } from './modules/auth/http/AuthRoutes';


const bootstrap = async () =>{
    const app = express();
    const injector = await initInjector();

    app.use( cors() );
    app.use( bodyParser.json() );

    registerAccountRoutes( app, injector );
    registerAuthRoutes( app, injector );
    registerJournalRoutes( app, injector );

    app.listen(8000, () => console.log('running on port 8000'));
}

bootstrap();


