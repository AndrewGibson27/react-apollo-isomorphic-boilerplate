import { getDataFromTree, ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { StaticRouter } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import React from 'react';
import ReactDOM from 'react-dom/server';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import express from 'express';
import webpack from 'webpack'; // eslint-disable-line
import hotMiddleware from 'webpack-hot-middleware'; // eslint-disable-line
import devMiddleware from 'webpack-dev-middleware'; // eslint-disable-line

import schema from './schema';
import App from '../shared/App';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const { port, isDev } = require('./config');
const webpackConfig = require('../webpack/client.dev.js');
const initDb = require('./db');

const compiler = webpack(webpackConfig);
const app = express();

app.use(express.static('public'));
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.set('view engine', 'pug');
app.set('port', port);

if (isDev) {
  app.use(hotMiddleware(compiler));
  app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
}

initDb(() => {
  app.use((req, res) => {
    const client = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: `http://localhost:${port}/graphql`,
        credentials: 'same-origin',
        headers: {
          cookie: req.header('Cookie'),
        },
      }),
      cache: new InMemoryCache(),
    });

    const context = {};
    const initialComponents = (
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    );

    getDataFromTree(initialComponents)
      .then(() => {
        const content = ReactDOM.renderToString(initialComponents);
        const initialState = client.extract();

        res.status(200);
        res.render('index', {
          env: process.env.NODE_ENV,
          initialState,
          content,
        });
        res.end();
      });
  });

  // eslint-disable-next-line consistent-return
  app.listen(port, 'localhost', (err) => {
    if (err) {
      if (isDev) {
        console.log(err); // eslint-disable-line
      }
      return false;
    }
    console.log(`Listening at http://localhost:${port}`); // eslint-disable-line
  });
});
