import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { categoriesQuery } from '../../../queries';
import CategoriesItem from '../components/CategoriesItem';

const Categories = ({
  data: { loading, categories },
  match,
}) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {categories.map(category => (
        <CategoriesItem
          key={category._id} // eslint-disable-line
          category={category}
          match={match}
        />
      ))}
    </ul>
  );
};

Categories.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
  }).isRequired,
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default graphql(categoriesQuery)(Categories);
