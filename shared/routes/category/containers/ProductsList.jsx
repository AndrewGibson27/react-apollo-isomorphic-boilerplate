/* eslint-disable no-underscore-dangle */

import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { productsByCategoryQuery } from '../../../queries';
import ProductsItem from '../components/ProductsItem';
import Loader from '../../../components/Loader';

const Products = ({
  data: { loading, productsByCategory },
}) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <ul>
      {productsByCategory.map(product => (
        <ProductsItem
          key={product._id}
          product={product}
        />
      ))}
    </ul>
  );
};

Products.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    productsByCategory: PropTypes.array,
  }).isRequired,
};

export default graphql(productsByCategoryQuery, {
  options: ({ match: { params: { id } } }) => ({ variables: { categoryId: id } }),
})(Products);
