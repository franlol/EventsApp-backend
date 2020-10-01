import { Document } from 'mongoose';

export type TBooking = {
  eventId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TBookingDocument = Document & TBooking;

export type TBookingPick = Pick<TBooking, "eventId" | "userId" | "createdAt" | "updatedAt">;
