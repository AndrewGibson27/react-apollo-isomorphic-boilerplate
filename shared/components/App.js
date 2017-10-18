import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Nav from './Nav';
import asyncComponent from '../utils/asyncComponent';
import { Container } from '../styles/containers';

const LatestNews = asyncComponent(() => (
  import('./LatestNews').then(module => module.default)
));

const FeaturedNews = asyncComponent(() => (
  import('./FeaturedNews').then(module => module.default)
));

const App = () => {
  return (
    <Container>
      <Nav />
      <main>
        <Switch>
          <Route path="/featured" component={FeaturedNews} />
          <Route path="/latest" component={LatestNews} />
          <Redirect to="/featured" />
        </Switch>
      </main>
    </Container>
  );
};

export default App;
