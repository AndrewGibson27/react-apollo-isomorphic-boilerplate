import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import asyncComponent from '../utils/asyncComponent';

const CategoryHome = asyncComponent(() => (
  import('./CategoryHome').then(module => module.default)
));

const LatestNews = () => (
  <Route path="/latest" component={CategoryHome} />
);

export default LatestNews;
