import express, { Express } from "express";
import { config as dotenv } from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql'

const app: Express = express();
dotenv();

type TEvent = {
  _id: string;
  title: string;
  description: string;
  price: number;
  date: string;
}

const eventList: Array<TEvent> = [{
  _id: 'id1',
  title: 'Event title 1',
  description: 'Event Description 1',
  price: 1.5,
  date: (new Date()).toString()
}, {
  _id: 'id2',
  title: 'Event title 2',
  description: 'Event Description 2',
  price: 2.5,
  date: (new Date()).toString()
}];

app.use(express.json());
app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input EventInput {
      _id: String!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }

  `),

  rootValue: {
    events: () => eventList,
    createEvent: ({ eventInput }: { eventInput: TEvent }) => {
      eventList.push(eventInput);
      console.log(eventInput)
      return eventInput
    }
  },

  graphiql: true,
}));

export default app;
