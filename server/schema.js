import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
  type Cart {
    _id: ID!,
    products: [Product]!
  }

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
    categories: [Category]!,
    products: [Product]!,
    productsByCategory(categoryId: ID!): [Product]!
    cart: Cart,
    product(productId: ID!): Product
  }

  type Mutation {
    addProduct(
      name: String!,
      description: String!,
      image: String!,
      price: Float!,
      categories: [ID]
    ): Product!,

    addCategory(
      name: String!,
      products: [ID]
    ): Category!,

    createCart: Cart!,
    addProductToCart(productId: ID!): Product!
  }
`;

export default makeExecutableSchema({ typeDefs, resolvers });
