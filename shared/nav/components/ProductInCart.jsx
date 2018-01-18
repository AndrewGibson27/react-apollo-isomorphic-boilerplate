import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import { cartQuery } from '../../queries';
import { removeProductFromCartMutation } from '../../mutations';

const ProductInCart = ({
  name,
  quantity,
  mutate,
  id,
}) => (
  <li>
    {name} {quantity}

    <button onClick={() => {
        mutate({
          variables: { productId: id },
          refetchQueries: [{ query: cartQuery }],
        });
      }}
    >
      Remove from cart
    </button>
  </li>
);

ProductInCart.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  mutate: PropTypes.func.isRequired,
};

export default graphql(removeProductFromCartMutation)(ProductInCart);
