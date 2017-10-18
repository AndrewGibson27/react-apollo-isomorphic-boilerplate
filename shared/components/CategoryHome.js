import React, { Component } from 'react';
import { connect, PromiseState } from 'react-refetch';
import { Route, NavLink } from 'react-router-dom';

import StoryList from './StoryList';
import asyncComponent from '../utils/asyncComponent';
import { GridRow, ColumnThree } from '../styles/grid';

function stripCategorySlash(path) {
  return path.slice(1);
}

const Story = asyncComponent(() => (
  import('./Story').then(module => module.default)
));

const CategoryHome = ({
  storiesFetch,
  match: { path }
}) => {
  if (storiesFetch.fulfilled) {
    return (
      <GridRow>
        <ColumnThree>
          <StoryList
            stories={storiesFetch.value}
            path={path}
          />
        </ColumnThree>

        <Route
          path={`${path}/:id`}
          component={Story}
        />
      </GridRow>
    );
  }

  return null;
}

export default connect(props => {
  const category = stripCategorySlash(props.match.path);
  return {
    storiesFetch: `/api/stories/?category=${category}`
  };
})(CategoryHome);
