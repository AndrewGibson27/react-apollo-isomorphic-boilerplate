import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

import { createCartMutation } from '../../mutations';
import { cartQuery } from '../../queries';
import Loader from '../../components/Loader';

class Cart extends Component {
  componentDidMount() {
    const { mutate, data: { cart } } = this.props;

    if (!cart) {
      mutate({
        refetchQueries: [{ query: cartQuery }],
      });
    }
  }

  render() {
    const { loading, cart } = this.props.data;

    if (!cart && !loading) {
      return null;
    }
    if (cart && loading) {
      return <Loader />;
    }
    if (cart && !loading) {
      return cart.products.map(({ name, _id }) => (
        <p key={_id}>{name}</p>
      ));
    }

    return null;
  }
}

Cart.propTypes = {
  mutate: PropTypes.func.isRequired,
  data: PropTypes.shape({
    cart: PropTypes.oneOfType([
      null,
      PropTypes.shape({
        products: PropTypes.array.isRequired,
      }),
    ]).isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

export default compose(
  graphql(cartQuery, { options: { errorPolicy: 'all' } }),
  graphql(createCartMutation, { options: { errorPolicy: 'all' } }),
)(Cart);
