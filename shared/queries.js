import gql from 'graphql-tag';

export const productQuery = gql`
  query ProductQuery($productId: ID!) {
    product(productId: $productId) {
      _id,
      name,
      description,
      price
    }
  }
`;

export const productsQuery = gql`
  query {
    products {
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

export const productsByCategoryQuery = gql`
  query ProductsByCategoryQuery($categoryId: ID!) {
    productsByCategory(categoryId: $categoryId) {
      _id,
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

export const cartQuery = gql`
  query {
    cart {
      products {
        _id,
        name
        quantity
      }
    }
  }
`;

export const categoriesQuery = gql`
  query {
    categories {
      _id,
      name
    }
  }
`;
