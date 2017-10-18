import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import asyncComponent from '../utils/asyncComponent';

const CategoryHome = asyncComponent(() => (
  import('./CategoryHome').then(module => module.default)
));

const FeaturedNews = () => (
  <Route path="/featured" component={CategoryHome} />
);

export default FeaturedNews;
