const path = require('path');
const webpack = require('webpack');
const saveLicense = require('uglify-save-license');

const {
  CLIENT_ENTRY,
  CLIENT_OUTPUT,
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },

      output: {
        comments: saveLicense
      }
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
