import Event from '../../../database/models/Event/Event';
import User from '../../../database/models/User/User';

import { TEvent } from "../../../database/models/Event/event.type";
import { USER_ID } from '../../helpers/temp';

export default {
  createEvent: async ({ eventInput }: { eventInput: TEvent }) => {
    try {
      const userId = USER_ID;
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
  }
}
