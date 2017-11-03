import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
  type Category {
    _id: ID!,
    name: String!,
    products: [Product]!
  }

  type Product {
    _id: ID!,
    name: String!,
    description: String!,
    image: String!,
    price: Float!,
    categories: [Category]!
  }

  type Query {
    categories: [Category],
    products(categoryName: String): [Product]
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
