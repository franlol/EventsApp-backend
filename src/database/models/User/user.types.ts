import { Document } from 'mongoose';

export type TUser = {
  email: string;
  password?: string;
  createdEvents: Array<string>;
}

export type TUserDocument = Document & TUser;
