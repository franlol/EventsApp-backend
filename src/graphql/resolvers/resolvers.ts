import bookingResolver from './booking';
import userResolver from './user';
import eventResolver from './event';

export default {
  ...bookingResolver,
  ...userResolver,
  ...eventResolver
}
