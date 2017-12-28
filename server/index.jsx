import React from 'react';
import ReactDOM from 'react-dom/server';
import Loadable from 'react-loadable';
import { getDataFromTree, ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { StaticRouter } from 'react-router-dom';
import { getBundles } from 'react-loadable/webpack';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import webpack from 'webpack'; // eslint-disable-line
import hotMiddleware from 'webpack-hot-middleware'; // eslint-disable-line
import devMiddleware from 'webpack-dev-middleware'; // eslint-disable-line

import schema from './schema';
import App from '../shared/App'; // eslint-disable-line
import initDb from './db';
import config from './config';
import webpackBaseConfig from '../webpack/base';
import webpackDevConfig from '../webpack/client.dev';
import stats from '../build/react-loadable.json';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const { port, isDev } = config;
const { PUBLIC_PATH } = webpackBaseConfig;
const compiler = webpack(webpackDevConfig);
const app = express();

app.use(express.static('public'));
app.use(session({
  secret: 'you will want to change this',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 },
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
    publicPath: webpackDevConfig.output.publicPath,
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
            <script src="${isDev ? '/main.js' : `${PUBLIC_PATH}main.js`}"></script>
            ${bundles.map(script => `<script src="${PUBLIC_PATH}${script.file}"></script>`).join('\n')}
            <script>window.startApp();</script>
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
