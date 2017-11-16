import { gql } from 'react-apollo';

export const createCart = gql`
  mutation {
    createCart {
      _id
    }
  }
`;

export const addCategoryMutation = gql`
  mutation AddCategoryMutation(
    $name: String!,
    $products: [ID]
  ) {
    addProduct(
      name: $name,
      products: $products
    ) {
      _id,
      name
    }
  }
`;

export const addProductMutation = gql`
  mutation AddProductMutation(
    $name: String!,
    $description: String!,
    $image: String!,
    $price: Float!,
    $categories: [ID]
  ) {
    addProduct(
      name: $name,
      description: $description,
      image: $image,
      price: $price,
      categories: $categories
    ) {
      _id,
      name
    }
  }
`;

export const addProductToCartMutation = gql`
  mutation AddProductToCartMutation($productId: ID!, $cartId: ID!) {
    addProductToCart(productId: $productId, cartId: $cartId) {
      _id
    }
  }
`;
