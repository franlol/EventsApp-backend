import { buildSchema } from "graphql";

export default buildSchema(`
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
  }

  type User {
    _id: ID!
    email: String!
    # password: String
    createdEvents: [Event!]
  }

  type Booking {
    _id: ID!
    eventId: String!
    userId: String!
    createdAt: String!
    updatedAt: String!
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
    users: [User!]!
    bookings: [Booking!]!
  }

  type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
