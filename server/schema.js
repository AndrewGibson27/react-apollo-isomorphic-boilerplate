import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
  type Category {
    _id: ID!,
    name: String!
  }

  type Query {
    categories: [Category]
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
