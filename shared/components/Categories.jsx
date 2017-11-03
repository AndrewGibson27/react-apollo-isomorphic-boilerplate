import React from 'react';
import { graphql } from 'react-apollo';
// import { Route, Switch } from 'react-router-dom';

import { productsQuery } from '../queries';

const Categories = ({ data: { loading, products } }) => {
  if (loading) {
    return null;
  }

  return (
    <ul>
      {products.map(product => (
        <li key={Math.random()}>{product.name}</li>
      ))}
    </ul>
  );
};

const ProductsWithData = graphql(productsQuery)(Categories);

export default ProductsWithData;
