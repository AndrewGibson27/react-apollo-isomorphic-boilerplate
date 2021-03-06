/* eslint-disable no-underscore-dangle */

import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { categoriesQuery } from '../../../queries';
import CategoriesItem from '../components/CategoriesItem';
import Loader from '../../../components/Loader';

const Categories = ({
  data: { loading, categories },
}) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <ul>
      {categories.map(category => (
        <CategoriesItem
          key={category._id}
          category={category}
        />
      ))}
    </ul>
  );
};

Categories.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    categories: PropTypes.array,
  }).isRequired,
};

export default graphql(categoriesQuery)(Categories);
