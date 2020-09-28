import { Document } from 'mongoose';

export type TEvent = {
  _id: string;
  title: string;
  description: string;
  price: number;
  date: Date;
  creator: string;
}

export type TEventDocument = Document & TEvent;
