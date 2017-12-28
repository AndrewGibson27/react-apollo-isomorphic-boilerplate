const path = require('path');
const webpack = require('webpack');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const {
  CLIENT_ENTRY,
  CLIENT_OUTPUT,
  SERVER_OUTPUT,
} = require('./base');

module.exports = {
  context: process.cwd(),

  entry: {
    main: [
      'webpack-hot-middleware/client',
      CLIENT_ENTRY,
    ],
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
    path: CLIENT_OUTPUT,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
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
