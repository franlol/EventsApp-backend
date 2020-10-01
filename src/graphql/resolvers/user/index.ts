import userQueries from './userQueries';
import userMutations from './userMutations';

export default {
  ...userQueries,
  ...userMutations
}
