import gql from 'graphql-tag';

export const createCartMutation = gql`
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
    addCategory(
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
  mutation AddProductToCartMutation(
    $productId: ID!,
    $quantity: Float!
  ) {
    addProductToCart(
      productId: $productId,
      quantity: $quantity
    ) {
      _id
    }
  }
`;
