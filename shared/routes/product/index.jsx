import React from 'react';
import PropTypes from 'prop-types';

const ProductRoute = ({ match }) => <p>Foo</p>;

ProductRoute.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ProductRoute;
