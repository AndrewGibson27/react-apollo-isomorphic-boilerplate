import React from 'react';
import PropTypes from 'prop-types';

import CategoriesList from './containers/CategoriesList';

const CategoriesRoute = ({ match }) => <CategoriesList match={match} />;

CategoriesRoute.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CategoriesRoute;
