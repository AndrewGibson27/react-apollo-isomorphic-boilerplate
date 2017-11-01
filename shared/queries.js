import { gql } from 'react-apollo';

export const categoriesQuery = gql`
  query CategoriesQuery {
    categories {
      name
    }
  }
`;
