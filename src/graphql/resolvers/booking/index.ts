import bookingQueries from './bookingQueries';
import bookingMutations from './bookingMutations';

export default {
  ...bookingQueries,
  ...bookingMutations
}
