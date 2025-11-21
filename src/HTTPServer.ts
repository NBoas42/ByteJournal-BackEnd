import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { registerUserRoutes } from './account/http/AccountRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

registerUserRoutes(app);


app.listen(8000, () => console.log('running on port 8000'));