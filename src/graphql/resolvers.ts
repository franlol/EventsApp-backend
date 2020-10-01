import bcrypt from 'bcrypt';

import Event from '../database/models/Event/Event';
import User from '../database/models/User/User';
import Booking from '../database/models/Booking/Booking';

import { TEvent } from "../database/models/Event/event.type";
import { TUser, TUserDocument, TUserLeanDocument } from "../database/models/User/user.types";
import { TBooking } from '../database/models/Booking/booking.types';

const user = async (userId: string) => {
  const user = await User.findById(userId).lean();
  if (!user) throw new Error(`User not found (id: ${userId})`);

  return {
    ...user,
    createdEvents: () => events(user.createdEvents as Array<string>)
  }
}

const events = async (eventsIdList: Array<string>) => {
  const events = await Event.find({ _id: { $in: eventsIdList } }).lean();

  return events.map((event: TEvent) => {
    return {
      ...event,
      creator: () => user(event.creator.toString())
    }
  })
}

export default {
  // QUERIES
  events: async () => {
    try {
      const events = await Event.find().lean(); // populate for gql relation

      const popEvents: TUserLeanDocument = events.map((event) => {
        return {
          ...event,
          creator: () => user((event.creator as TUserDocument)._id)
        }
      });

      return popEvents;
    } catch (err) {
      throw new Error(err);
    }
  },

  users: async () => {
    try {
      const users = await User.find().lean();
      return users.map((user: TUser) => {
        return {
          ...user,
          createdEvents: events(user.createdEvents as Array<string>)
        }
      });
    } catch (error) {
      throw new Error(error)
    }
  },

  bookings: async () => {
    const bookings = await Booking.find().lean();
    return bookings;
  },

  // MUTATIONS
  createEvent: async ({ eventInput }: { eventInput: TEvent }) => {
    try {
      const userId = '5f7471a23009a36ef05543a7';
      const eventCreator = await User.findOne({ _id: userId });
      if (!eventCreator) throw new Error('Creator user does not exists');

      const event: TEvent = {
        ...eventInput,
        date: new Date(eventInput.date),
        creator: eventCreator._id
      }

      const newEvent = await Event.create(event);
      eventCreator.createdEvents.push(newEvent._id);
      await eventCreator.save();

      return newEvent;
    } catch (error) {
      console.log('Error in "createEvent resolver"', error);
      throw new Error(error);
    }
  },

  createUser: async ({ userInput }: { userInput: TUser }) => {
    try {
      const userExists = await User.findOne({ email: userInput.email });
      if (userExists) throw new Error('User already exists.');

      const newPassword: string = await bcrypt.hash(userInput.password, 12);
      const newUser: TUserDocument = await User.create({ ...userInput, password: newPassword });
      newUser.password = undefined;

      return newUser;
    } catch (error) {
      console.log('Error in "createUser Resolver":', error)
      throw new Error(error)
    }
  },
};
