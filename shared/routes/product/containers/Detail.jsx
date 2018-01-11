import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { productQuery } from '../../../queries';
import Loader from '../../../components/Loader';

const Detail = ({
  data: { loading, product },
}) => {
  if (loading) {
    return <Loader />;
  }

  const { name, description, price } = product;

  return (
    <header>
      <h1>{name}</h1>
      <h2>{description}</h2>
      <p>${price}</p>
    </header>
  );
};

Detail.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    product: PropTypes.object,
  }).isRequired,
};

export default graphql(productQuery, {
  options: ({ match: { params: { id } } }) => ({ variables: { productId: id } }),
})(Detail);
