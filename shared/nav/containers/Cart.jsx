import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { createCartMutation } from '../../mutations';
import { cartQuery } from '../../queries';

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

    let cartMarkup;

    if (!cart && !loading) {
      cartMarkup = null;
    }

    if (cart && loading) {
      cartMarkup = <p>Loading...</p>;
    }

    if (cart && !loading) {
      cartMarkup = cart.products.map(product => (
        <p key={Math.random()}>{product.name}</p>
      ));
    }

    return <div>{cartMarkup}</div>;
  }
}

export default compose(
  graphql(cartQuery, { options: { errorPolicy: 'all' } }),
  graphql(createCartMutation, { options: { errorPolicy: 'all' } }),
)(Cart);
