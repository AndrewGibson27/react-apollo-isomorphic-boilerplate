import { getDataFromTree, ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { StaticRouter } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import express from 'express';
import session from 'express-session';
import webpack from 'webpack'; // eslint-disable-line
import hotMiddleware from 'webpack-hot-middleware'; // eslint-disable-line
import devMiddleware from 'webpack-dev-middleware'; // eslint-disable-line

import schema from './schema';
import App from '../shared/App';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const stats = require('../build/react-loadable.json');
const { port, isDev } = require('./config');
const webpackConfig = require('../webpack/client.dev.js');
const initDb = require('./db');

const compiler = webpack(webpackConfig);
const app = express();

app.use(express.static('public'));
app.use(session({
  secret: 'you will want to change this',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 6000000 },
}));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.use('/graphql', bodyParser.json(), (req, res, next) => {
  const context = { session: req.session };
  graphqlExpress({ schema, context })(req, res, next);
});

app.set('view engine', 'pug');
app.set('port', port);

if (isDev) {
  app.use(hotMiddleware(compiler));
  app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
}

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

  const modules = [];
  const context = {};
  const initialComponents = (
    <ApolloProvider client={client}>
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Loadable.Capture>
    </ApolloProvider>
  );

  getDataFromTree(initialComponents)
    .then(() => {
      const content = ReactDOM.renderToString(initialComponents);
      const initialState = client.extract();
      const bundles = getBundles(stats, modules);

      res.send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>React Boilerplate</title>
          </head>
          <body>
            <div id="root">${content}</div>
            <script>window.__APOLLO_STATE__ = ${JSON.stringify(initialState)};</script>
            <script src=${isDev ? '/main.js' : '/assets/main.js'}></script>
            ${bundles.map(script => `<script src="/assets/${script.file}"></script>`).join('\n')}
            <script>window.main();</script>
          </body>
        </html>
      `);
    });
});

initDb(() => {
  Loadable.preloadAll().then(() => {
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
});
