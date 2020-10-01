import User from '../../database/models/User/User';
import Event from '../../database/models/Event/Event';

import { TEvent } from '../../database/models/Event/event.type';

export const populateUser = async (userId: string) => {
  const user = await User.findById(userId).lean();
  if (!user) throw new Error(`User not found (id: ${userId})`);

  return {
    ...user,
    createdEvents: () => populatEevents(user.createdEvents as Array<string>)
  }
}

export const populateSingleEvent = async (eventId: string) => {
  const event = await Event.findById(eventId).lean();
  if (!event) throw new Error('Event does not exists.');

  return {
    ...event,
    creator: () => populateUser(event?.creator as string)
  }
}

export const populatEevents = async (eventsIdList: Array<string>) => {
  const events = await Event.find({ _id: { $in: eventsIdList } }).lean();

  return events.map((event: TEvent) => {
    return {
      ...event,
      creator: () => populateUser(event.creator.toString())
    }
  });
}
