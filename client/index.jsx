/* global window, document */

import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, ApolloClient } from 'react-apollo';

import config from './config';
import App from '../shared/components/App';

const client = new ApolloClient({
  initialState: window.__APOLLO_STATE__, // eslint-disable-line
});

hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);

if (config.isDev) {
  module.hot.accept();
}
