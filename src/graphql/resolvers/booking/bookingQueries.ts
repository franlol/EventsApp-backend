import Booking from '../../../database/models/Booking/Booking';
import { populateSingleEvent, populateUser } from "../../helpers/populateHelper";

import { TBookingPick } from "../../../database/models/Booking/booking.types";

export default {
  bookings: async () => {
    const bookings: Array<TBookingPick> = await Booking.find().lean();

    return bookings.map((booking: TBookingPick) => {
      return {
        ...booking,
        userId: populateUser(booking.userId.toString()),
        eventId: populateSingleEvent(booking.eventId.toString())
      }
    });
  }
}
