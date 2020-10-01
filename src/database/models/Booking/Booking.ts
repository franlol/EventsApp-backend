import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const bookingModel = model('Booking', bookingSchema);

export default bookingModel;
