'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/js/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  // resolve: {
  //   alias: {
  //     'react-ace':  path.join(__dirname, '..', 'src', 'ace.jsx')
  //   }
  // },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      exclude: /node_modules/
    },
    {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "src","sass")]
  }
};

// var webpack = require('webpack');
// module.exports = {
//   module: {
//     loaders: [
//       { test: /\.jsx?$/, loaders: ['babel-loader'], exclude: /node_modules/ }
//     ]
//   },
//   output: {
//     library: 'ReactAce',
//     libraryTarget: 'umd'
//   },
//   resolve: {
//     extensions: ['', '.js']
//   }
// };
