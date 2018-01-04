import React from 'react';
import Loadable from 'react-loadable';
import { Route, Redirect, Switch } from 'react-router-dom';

import Nav from './nav';
import Loader from './components/Loader';

const CategoriesRoute = Loadable({
  loader: () => import('./routes/categories'),
  loading: Loader,
});

const CategoryRoute = Loadable({
  loader: () => import('./routes/category'),
  loading: Loader,
});

export default () => (
  <main>
    <Nav />
    <Switch>
      <Route exact path="/" component={CategoriesRoute} />
      <Route path="/category/:id" component={CategoryRoute} />
      <Redirect to="/" />
    </Switch>
  </main>
);
