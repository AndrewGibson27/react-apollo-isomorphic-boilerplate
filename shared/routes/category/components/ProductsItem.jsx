import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Product = ({
  product: { name, _id },
}) => (
  <li>
    <NavLink to={`/product/${_id}`}>{name}</NavLink>
  </li>
);

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;
