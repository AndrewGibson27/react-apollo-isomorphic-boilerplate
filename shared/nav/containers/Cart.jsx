import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

import { createCartMutation } from '../../mutations';
import { cartQuery } from '../../queries';
import Loader from '../../components/Loader';
import ProductInCart from '../components/ProductInCart';

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
      return (
        <div>
          <h1>Your cart contains:</h1>
          <ul>
            {cart.products.map(({ name, quantity, _id }) => (
              <ProductInCart
                key={_id}
                name={name}
                quantity={quantity}
              />
            ))}
          </ul>
        </div>
      );
    }

    return null;
  }
}

Cart.propTypes = {
  mutate: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line
};

export default compose(
  graphql(cartQuery, { options: { errorPolicy: 'all' } }),
  graphql(createCartMutation, { options: { errorPolicy: 'all' } }),
)(Cart);
