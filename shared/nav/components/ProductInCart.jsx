import React from 'react';
import PropTypes from 'prop-types';

const ProductInCart = ({ name, quantity }) => <li>{name} {quantity}</li>;

ProductInCart.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default ProductInCart;
