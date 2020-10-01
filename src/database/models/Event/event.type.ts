import { Document } from 'mongoose';
import { TUser, TUserDocument } from '../User/user.types';

export type TEvent = {
  _id: string;
  title: string;
  description: string;
  price: number;
  date: Date;
  creator: string | TUser | TUserDocument;
}

export type TEventDocument = Document & TEvent & { _doc?: TEvent };
