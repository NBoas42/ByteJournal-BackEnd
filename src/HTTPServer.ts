import express from 'express';
import cors from 'cors';

import { registerUserRoutes } from './user/api/UserRoutes';

const app = express();

app.use(cors());

registerUserRoutes(app);


app.listen(8000, () => console.log('running on port 8000'));