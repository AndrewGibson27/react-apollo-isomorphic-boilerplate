const path = require('path');
const webpack = require('webpack');

const {
  CLIENT_ENTRY,
  CLIENT_OUTPUT,
  PUBLIC_PATH,
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
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  }
};
