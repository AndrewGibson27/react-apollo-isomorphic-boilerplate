import React from 'react';
import { graphql } from 'react-apollo';
// import { Route, Switch } from 'react-router-dom';

import { categoriesQuery } from '../queries';

const Categories = ({ data: { loading, categories } }) => {
  if (loading) {
    console.log('foo');
    return null;
  }

  return (
    <ul>
      {categories.map(category => (
        <li key={Math.random()}>{category.name}</li>
      ))}
    </ul>
  );
};

const CategoriesWithData = graphql(categoriesQuery)(Categories);

export default CategoriesWithData;
