import bcrypt from 'bcrypt';

import User from '../../../database/models/User/User';
import { generateToken } from './user.helper';
import { populatEevents } from '../../helpers/populateHelper';

import { TUser, TUserLeanDocument } from '../../../database/models/User/user.types';
import { TAuth, TUserInput } from '../../schemas/user/userSchema.types';

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
  },

  signIn: async ({ userInput }: { userInput: TUserInput }): Promise<TAuth> => {
    const { email, password } = userInput;

    try {
      const user: TUserLeanDocument | null = await User.findOne({ email }).select('-createdEvents +password').lean();
      if (!user) throw new Error('Email or Password are incorrects.');
      
      const validPassword = await bcrypt.compare(password, user.password!);
      if (!validPassword) throw new Error('Email or Password are incorrects.'); // jwt already throws a error ^^

      delete user.password;
      const token = generateToken(user);

      return {
        _id: user._id,
        token
      }
    } catch (error) {
      console.log('Error in SignIn Resolver', error);
      throw new Error(error);
    }
  }
}
