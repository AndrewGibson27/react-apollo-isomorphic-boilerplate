import ReactDOM from 'react-dom/server';
import bodyParser from 'body-parser';
import { StaticRouter } from 'react-router-dom';
import {
  ApolloClient,
  createNetworkInterface,
  getDataFromTree,
  ApolloProvider,
} from 'react-apollo';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';

import schema from './schema';

const React = require('react');
const express = require('express');
const pug = require('pug');
const webpack = require('webpack');

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
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
}

initDb(() => {
  app.use((req, res) => {
    const client = new ApolloClient({
      ssrMode: true,
      networkInterface: createNetworkInterface({
        uri: `http://localhost:${port}`,
        opts: {
          credentials: 'same-origin',
          headers: {
            cookie: req.header('Cookie'),
          },
        },
      }),
    });

    const context = {};
    const app = (
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>

        </StaticRouter>
      </ApolloProvider>
    );

    getDataFromTree(app).then(() => {
      const content = ReactDOM.renderToString(app);
      const initialState = {
        [client.reduxRootKey]: client.getInitialState()
      };

      res.status(200);
      res.send('foo');
      res.end();
    });
  });

  app.listen(port, 'localhost', (err) => {
    if (err) {
      if (isDev) {
        console.log(err);
      }
      return false;
    }
    console.log(`Listening at http://localhost:${port}`);
  });
});
