import { Schema, model, Model } from 'mongoose';
import { TEventDocument } from './event.type';

const eventSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const eventModel: Model<TEventDocument> = model<TEventDocument>('Event', eventSchema);

export default eventModel;
