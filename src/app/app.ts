import express, { Express } from "express";
import { config as dotenv } from 'dotenv';

const app: Express = express();
dotenv();

app.use(express.json());

export default app;
