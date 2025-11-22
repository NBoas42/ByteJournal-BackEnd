import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import "reflect-metadata"

import { registerUserRoutes } from './account/http/AccountRoutes';
import { getInjector } from './shared/dependency-injection/DependecyInjector';


const bootstrap = async () =>{
    const app = express();
    const injector = await getInjector();

    app.use(cors());
    app.use(bodyParser.json());

    registerUserRoutes(app,injector);


    app.listen(8000, () => console.log('running on port 8000'));
}

bootstrap();


