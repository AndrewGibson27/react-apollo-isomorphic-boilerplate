import React from 'react';
import PropTypes from 'prop-types';

const ProductInCart = ({ name }) => <li>{name}</li>;

ProductInCart.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ProductInCart;
