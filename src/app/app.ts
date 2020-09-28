import express, { Express } from "express";
import { config as dotenv } from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql'

const app: Express = express();
dotenv();

const eventList: Array<string> = ['hey', 'hoy'];

app.use(express.json());
app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
  
    type RootQuery {
      events: [String]
    }

    type RootMutation {
      createEvent(eventName: String): String
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }

  `),
  rootValue: {
    events: () => eventList,
    createEvent: ({ eventName }: { eventName: string }) => {
      eventList.push(eventName);
      return eventName
    }
  },
  graphiql: true,
}));

export default app;
