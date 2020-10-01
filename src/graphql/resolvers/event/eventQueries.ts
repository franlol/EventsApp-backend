import { populateUser } from '../../helpers/populateHelper';
import Event from '../../../database/models/Event/Event';

import { TUserDocument, TUserLeanDocument } from '../../../database/models/User/user.types';

export default {
  events: async () => {
    try {
      const events = await Event.find().lean();

      const popEvents: TUserLeanDocument = events.map((event) => {
        return {
          ...event,
          creator: () => populateUser((event.creator as TUserDocument)._id)
        }
      });

      return popEvents;
    } catch (err) {
      throw new Error(err);
    }
  },
}
