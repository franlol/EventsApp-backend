import { graphqlHTTP } from 'express-graphql';

import schemas from './schemas/schemas';
import resolvers from './resolvers/resolvers';

export default graphqlHTTP({
  schema: schemas,
  rootValue: resolvers,
  graphiql: true,
});
