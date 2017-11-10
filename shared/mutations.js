import { gql } from 'react-apollo';

// eslint-disable-next-line import/prefer-default-export
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

export const createCart = gql`
  mutation CreateCart {
    _id,
    products {
      _id,
      name
    }
  }
`;
