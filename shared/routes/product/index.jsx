import React from 'react';
import PropTypes from 'prop-types';

import Detail from './containers/Detail';
import Form from './containers/Form';

const ProductRoute = ({ match }) => (
  <div>
    <Detail match={match} />
    <Form match={match} />
  </div>
);

ProductRoute.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ProductRoute;
