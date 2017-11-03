import { gql } from 'react-apollo';

export const categoriesQuery = gql`
  query CategoriesQuery {
    categories {
      name
    }
  }
`;

export const productsQuery = gql`
  query ProductsQuery {
    products(categoryName: "Category A") {
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
