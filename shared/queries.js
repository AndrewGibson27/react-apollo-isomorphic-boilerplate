import { gql } from 'react-apollo';

export const categoriesQuery = gql`
  query CategoriesQuery {
    categories {
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
        name
      }
    }
  }
`;
