import { Document } from 'mongoose';
import { TEvent, TEventDocument } from '../Event/event.type';

export type TUser = {
  _id: string;
  email: string;
  password?: string;
  createdEvents: Array<string | TEvent | TEventDocument>;
}

export type TUserDocument = Document & TUser & { _doc?: TUser };

export type TUserLeanDocument = Pick<TEventDocument, any>