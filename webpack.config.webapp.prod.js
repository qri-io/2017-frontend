/* eslint global-require: 0, import/no-dynamic-require: 0 */

import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'
import CheckNodeEnv from './internals/scripts/CheckNodeEnv'
import MinifyPlugin from 'babel-minify-webpack-plugin'

CheckNodeEnv('production')

const publicPath = `/`

export default merge.smart(baseConfig, {
  target: 'web',
  mode: 'production',

  entry: path.join(__dirname, 'lib/index.js'),

  output: {
    publicPath,
    path: path.join(__dirname, '/dist/web'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },

  plugins: [
    new MinifyPlugin({}, {
      sourceMap: null
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      '__BUILD__': {
        'MODE': JSON.stringify(process.env.NODE_ENV || 'development'),
        'BASE_URL': JSON.stringify('http://localhost:2503'),
        'API_URL': JSON.stringify('http://localhost:2503'),
        'STATIC_ASSETS_URL': JSON.stringify('http://localhost:2503'),
        'SEGMENT_KEY': JSON.stringify('not_a_key')
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.global\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          }
        ]
      },
      // Add SASS support  - compile all .global.scss files and pipe it to style.css
      {
        test: /\.global\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        // use: {
        //   loader: 'url-loader',
        //   options: {
        //     limit: 10000,
        //     mimetype: 'application/font-woff'
        //   }
        // }
        use: 'file-loader'
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        // use: {
        //   loader: 'url-loader',
        //   options: {
        //     limit: 10000,
        //     mimetype: 'application/octet-stream'
        //   }
        // }
        use: 'file-loader'
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        // use: {
        //   loader: 'url-loader',
        //   options: {
        //     limit: 10000,
        //     mimetype: 'image/svg+xml'
        //   }
        // }
        use: 'file-loader'
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader'
      }
    ]
  }
})
