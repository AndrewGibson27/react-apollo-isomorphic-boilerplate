import { gql } from 'react-apollo';

export const productQuery = gql`
  query ProductQuery($productId: ID!) {
    product(productId: $productId) {
      _id,
      name
    }
  }
`;

export const categoriesQuery = gql`
  query CategoriesQuery {
    categories {
      _id,
      name
    }
  }
`;

export const productsQuery = gql`
  query ProductsQuery($categoryId: ID) {
    products(categoryId: $categoryId) {
      name,
      description,
      price,
      image,
      categories {
        _id,
        name
      }
    }
  }
`;

export const productsInCartQuery = gql`
  query ProductsInCartQuery($cartId: ID!) {
    productsInCart(cartId: $cartId) {
      _id,
      name
    }
  }
`;
