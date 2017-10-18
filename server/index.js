const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { match, RouterContext } = require('react-router');
const express = require('express');
const path = require('path');
const pug = require('pug');
const webpack = require('webpack');
const bodyParser = require('body-parser');

const { port, isDev } = require('./config');
const webpackConfig = require('../webpack/client.dev.js');
const api = require('./api');
const initDb = require('./db');

const compiler = webpack(webpackConfig);
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('port', port);
app.use('/api', api);

if (isDev) {
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
}

initDb(() => {
  app.get('*', (req, res) => {
    res.render('index', {
      env: process.env.NODE_ENV
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
