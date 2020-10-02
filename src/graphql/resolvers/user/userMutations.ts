import bcrypt from 'bcrypt';

import { generateToken } from './user.helper';
import User from '../../../database/models/User/User';

import { TUser, TUserLeanDocument } from '../../../database/models/User/user.types';
import { TAuth, TUserInput } from '../../schemas/user/userSchema.types';

export default {
  signup: async ({ userInput }: { userInput: TUserInput }): Promise<TAuth> => {
    const { email, password } = userInput;

    try {
      const userExists = await User.findOne({ email: userInput.email });
      if (userExists) throw new Error('User already exists.');

      const newPassword = await bcrypt.hash(password, 12);

      await User.create({
        email,
        password: newPassword,
        createdEvents: []
      } as TUser);

      const createdUser: TUserLeanDocument | null = await User.findOne({ email }).select('-createdEvents').lean();
      if (!createdUser) {
        await User.deleteOne({ email });
        throw new Error('Error creating new user.');
      }

      const token = generateToken(createdUser);

      return {
        _id: createdUser._id,
        token,
      }
    } catch (error) {
      console.log('Error in SignUp Resolver.', error);
      throw new Error(error);
    }
  }
}
