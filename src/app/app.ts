import express, { Express } from "express";
import { config as dotenv } from 'dotenv';
import { graphqlHTTP } from 'express-graphql';

import resolvers from '../graphql/resolvers';
import schemas from '../graphql/schemas';

const app: Express = express();
dotenv();

app.use(express.json());

app.use('/graphql', graphqlHTTP({
  schema: schemas,
  rootValue: resolvers,
  graphiql: true,
}));

export default app;
