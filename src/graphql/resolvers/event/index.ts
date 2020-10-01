import eventQueries from './eventQueries';
import eventMutations from './eventMutations';

export default {
  ...eventQueries,
  ...eventMutations
}
