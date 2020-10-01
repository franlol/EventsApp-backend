import Booking from '../../../database/models/Booking/Booking';
import Event from '../../../database/models/Event/Event';

import { USER_ID } from '../../helpers/temp';
import { TBooking, TBookingDocument } from '../../../database/models/Booking/booking.types';

export default {
  createBooking: async ({ eventId }: { eventId: string }) => {
    try {
      const event = await Event.findById(eventId);
      if (!event) throw new Error('Event does not exists');

      const booking: TBooking = {
        eventId: event?._id,
        userId: USER_ID,
      }

      const newBooking = await Booking.create(booking);
      return newBooking;
    } catch (error) {
      console.log('Error in createBooking resolver');
      throw error;
    }
  },

  cancelBooking: async ({ bookingId }: { bookingId: string }) => {
    try {
      const booking = await Booking.findById(bookingId) as TBookingDocument;
      if (!booking) throw new Error('Booking does not exists');

      const event = await Event.findById(booking.eventId);
      if (!event) throw new Error('The related event of the booking does not exists.');

      const deletedBooking = await Booking.findByIdAndDelete(booking._id);
      if (!deletedBooking) throw new Error('Error deleting the booking.')

      return event;

    } catch (error) {
      console.log('Error in cancelBooking resolver.')
      throw error;
    }
  }
}
