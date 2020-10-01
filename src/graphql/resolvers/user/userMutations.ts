import bcrypt from 'bcrypt';

import User from '../../../database/models/User/User';
import { TUser, TUserDocument } from '../../../database/models/User/user.types';

export default {
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
  }
}
