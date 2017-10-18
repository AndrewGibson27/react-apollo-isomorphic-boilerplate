const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const {
  SERVER_ENTRY,
  SERVER_OUTPUT,
} = require('./base');

function getExternals() {
  const nodeModules = fs.readdirSync(path.join(process.cwd(), 'node_modules'));
  return nodeModules.reduce((ext, mod) => {
    ext[mod] = `commonjs ${mod}`;
    return ext;
  }, {});
}

module.exports = {
  target: 'node',

  entry: SERVER_ENTRY,

  output: {
    path: SERVER_OUTPUT,
    filename: 'server.js',
  },

  plugins: [
    new webpack.IgnorePlugin(/\.(css|less|scss|svg|png|jpe?g|png)$/),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],

  externals: getExternals(),

  node: {
    __filename: true,
    __dirname: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
};
