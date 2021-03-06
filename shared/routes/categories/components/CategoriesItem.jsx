import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Category = ({
  category: { name, _id },
}) => (
  <li>
    <NavLink to={`/category/${_id}`}>{name}</NavLink>
  </li>
);

Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Category;
