const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const {
  CLIENT_ENTRY,
  CLIENT_OUTPUT,
  SERVER_OUTPUT,
  PUBLIC_PATH,
} = require('./base');

module.exports = {
  context: process.cwd(),

  entry: {
    main: CLIENT_ENTRY,
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: PUBLIC_PATH,
    path: CLIENT_OUTPUT,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new UglifyJsPlugin(),
    new ReactLoadablePlugin({
      filename: path.join(SERVER_OUTPUT, 'react-loadable.json'),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
};
