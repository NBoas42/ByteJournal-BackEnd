import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import "reflect-metadata"

import { registerUserRoutes } from './account/http/AccountRoutes';
import { initInjector } from './shared/dependency-injection/DependecyInjector';
import { registerJournalRoutes } from './journal/http/JournalRoutes';
import { registerAuthRoutes } from './auth/http/AuthRoutes';


const bootstrap = async () =>{
    const app = express();
    const injector = await initInjector();

    app.use( cors() );
    app.use( bodyParser.json() );


    registerAuthRoutes( app, injector )
    registerUserRoutes( app, injector ) ;
    registerJournalRoutes( app, injector );

    app.listen(8000, () => console.log('running on port 8000'));
}

bootstrap();


