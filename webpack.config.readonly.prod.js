/* eslint global-require: 0, import/no-dynamic-require: 0 */

import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'
import CheckNodeEnv from './internals/scripts/CheckNodeEnv'
import MinifyPlugin from 'babel-minify-webpack-plugin'

import version from './version'
const appTarget = process.env.APP_TARGET || 'web'
const apiUrl = process.env.QRI_FRONTEND_BUILD_API_URL || 'http://localhost:2503'
console.log(apiUrl)

CheckNodeEnv('production')

export default merge.smart(baseConfig, {
  target: 'web',
  mode: 'production',

  entry: path.join(__dirname, 'lib/index.js'),

  output: {
    globalObject: 'self',
    publicPath: '/webapp/',
    path: path.join(__dirname, '/dist/readonly'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  plugins: [
    new webpack.NormalModuleReplacementPlugin(/(.*)\.APP_TARGET(\.*)/, function (resource) {
      resource.request = resource.request.replace(/\.APP_TARGET/, `.${appTarget}`)
    }),
    new MinifyPlugin({}, { sourceMap: null }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      '__BUILD__': {
        'MODE': JSON.stringify(process.env.NODE_ENV || 'production'),
        'READONLY': true,
        // 'BASE_URL': JSON.stringify(apiUrl),
        'API_URL': JSON.stringify(apiUrl),
        'STATIC_ASSETS_URL': JSON.stringify(apiUrl),
        'SEGMENT_KEY': JSON.stringify('not_a_key'),
        'VERSION': JSON.stringify(version)
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            mimetype: 'application/font-woff'
          }
        }
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            mimetype: 'application/font-woff'
          }
        }
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 500000,
            mimetype: 'application/octet-stream'
          }
        }
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            mimetype: 'application/vnd.ms-fontobject'
          }
        }
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            mimetype: 'image/svg+xml'
          }
        }
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader'
      }
    ]
  }
})
