import User from '../../../database/models/User/User';
import { populatEevents } from '../../helpers/populateHelper';

import { TUser } from '../../../database/models/User/user.types';

export default {
  users: async () => {
    try {
      const users = await User.find().lean();
      return users.map((user: TUser) => {
        return {
          ...user,
          createdEvents: populatEevents(user.createdEvents as Array<string>)
        }
      });
    } catch (error) {
      throw new Error(error)
    }
  }
}
