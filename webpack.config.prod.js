'use strict';

var path = require('path');
var webpack = require('webpack');

var ENV = {
  __BUILD__ : {
    PRODUCTION : true,
    DEVELOP : false,

    BASE_URL : JSON.stringify("http://www.qri.io"),
    API_URL : JSON.stringify("http://www.qri.io"),
    STATIC_ASSETS_URL : JSON.stringify("http://cdn.qri.io"),
    SEGMENT_KEY : JSON.stringify("b4iAxJT8ISitRFQ6qZGS9w7RTnaOpvju"),
  }
};

function exitOneFail() {
  this.plugin("done", function(stats) {
    if (stats.compilation.errors && stats.compilation.errors.length) {
      console.log(stats.compilation.errors);
      process.exit(1);
    }
  });
}

module.exports = {
  entry: {
    'app' : './src/js/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath : "http://cdn.qri.io/js/",
    filename: '[name].min.js',
    chunkFilename: "[name].chunk.min.js"
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(ENV),
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
    exitOneFail,
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
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
  }
};
