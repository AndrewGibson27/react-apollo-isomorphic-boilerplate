import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
  type Cart {
    _id: ID!,
    products: [ID]!
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
    categories: [Category],
    products(categoryId: ID): [Product],
    productsInCart(cartId: ID!): [Product]
    product(productId: ID!): Product
  }

  type Mutation {
    addProduct(
      name: String!,
      description: String!,
      image: String!,
      price: Float!,
      categories: [ID]
    ): Product,

    createCart: Cart,
    addProductToCart(productId: ID!, cartId: ID!): Product,
  }
`;

export default makeExecutableSchema({ typeDefs, resolvers });
