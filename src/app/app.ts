import express, { Express } from "express";
import { config as dotenv } from 'dotenv';

import gqlMiddleware from '../graphql/graphql';

const app: Express = express();
dotenv();

app.use(express.json());
app.use('/graphql', gqlMiddleware);

export default app;
