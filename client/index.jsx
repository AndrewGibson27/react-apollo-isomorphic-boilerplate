/* global document, window */

import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Loadable from 'react-loadable';

import config from './config';
import App from '../shared/App';

const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
});

const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__), // eslint-disable-line
  link,
  ssrMode: true,
});

window.main = () => {
  Loadable.preloadReady().then(() => {
    hydrate(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>,
      document.getElementById('root'),
    );
  });
};

if (config.isDev) {
  module.hot.accept();
}
