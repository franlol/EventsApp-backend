import express, { Express } from "express";
import { config as dotenv } from 'dotenv';
import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql';
import bcrypt from "bcrypt";

import Event from '../database/models/Event/Event';
import User from '../database/models/User/User';

import { TEvent, TEventDocument } from "../database/models/Event/event.type";
import { TUser, TUserDocument } from "../database/models/User/user.types";

const app: Express = express();
dotenv();

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

    type User {
      _id: ID!
      email: String!
      password: String
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }

  `),

  rootValue: {
    events: async () => {
      try {
        const events = await Event.find();
        return events;
      } catch (err) {
        throw new Error(err);
      }
    },

    createEvent: async ({ eventInput }: { eventInput: TEvent }) => {
      try {
        const event: TEvent = {
          ...eventInput,
          date: new Date(eventInput.date),
          creator: '5f7203229d1cf377e7147134' // temp    
        }

        const newEvent: TEventDocument = await Event.create(event);

        return newEvent;

      } catch (error) {
        console.log('Error in "createEvent resolver"', error);
        throw new Error(error);
      }
    },

    createUser: async ({ userInput }: { userInput: TUser }) => {
      try {
        const userExists = await User.findOne({ email: userInput.email }).select('-password');
        if (userExists) throw new Error('User already exists.');

        const newPassword: string = await bcrypt.hash(userInput.password, 12);
        const newUser: TUserDocument = await User.create({ ...userInput, password: newPassword });
        newUser.password = undefined;

        return newUser;
      } catch (error) {
        console.log('Error in "createUser Resolver":', error)
        throw new Error(error)
      }
    }

  },

  graphiql: true,
}));

export default app;
