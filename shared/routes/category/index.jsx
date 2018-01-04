import React from 'react';
import PropTypes from 'prop-types';

import ProductsList from './containers/ProductsList';

const CategoryRoute = ({ match }) => <ProductsList match={match} />;

CategoryRoute.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CategoryRoute;
