import express, { Express } from "express";
import { config as dotenv } from 'dotenv';

import gqlMiddleware from '../graphql/graphql';
import { isAuth } from '../app/middlewares/auth/authMiddleware';

const app: Express = express();
dotenv();

app.use(express.json());
app.use(isAuth);
app.use('/graphql', gqlMiddleware);

export default app;
