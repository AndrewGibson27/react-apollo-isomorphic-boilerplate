import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { addProductToCartMutation } from '../../../mutations';
import { cartQuery } from '../../../queries';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 0 };
  }

  render() {
    const { mutate, match: { params: { id } } } = this.props;
    const { quantity } = this.state;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate({
            variables: { productId: id, quantity },
            refetchQueries: [{ query: cartQuery }],
          });
        }}
      >
        <label
          htmlFor="quantity"
        >
          <input
            id="quantity"
            type="text"
            name="quantity"
            value={quantity}
            onChange={(e) => {
              this.setState({ quantity: e.target.value });
            }}
          />
          Enter a quantity.
        </label>

        <input
          type="submit"
          value="Checkout"
        />
      </form>
    );
  }
}

Form.propTypes = {
  mutate: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default graphql(addProductToCartMutation)(Form);
