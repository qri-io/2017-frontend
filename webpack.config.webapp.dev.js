/* eslint global-require: 0, import/no-dynamic-require: 0 */

import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import baseConfig from './webpack.config.base'
import CheckNodeEnv from './internals/scripts/CheckNodeEnv'
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'

CheckNodeEnv('development')

const port = process.env.PORT || 2505
const publicPath = `/`

export default merge.smart(baseConfig, {
  devtool: 'inline-source-map',
  target: 'web',
  mode: 'development',

  entry: [
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.join(__dirname, 'lib/index.js')
  ],

  output: {
    globalObject: 'self',
    publicPath,
    path: path.join(__dirname, 'dist/web_dev'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },

  devServer: {
    port,
    publicPath,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'resources/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new MonacoWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      '__BUILD__': {
        'MODE': JSON.stringify(process.env.NODE_ENV || 'development'),
        'BASE_URL': JSON.stringify('http://localhost:2503'),
        'API_URL': JSON.stringify('http://localhost:2503'),
        'STATIC_ASSETS_URL': JSON.stringify('http://localhost:2503'),
        'SEGMENT_KEY': JSON.stringify('not_a_key'),
        'VERSION': JSON.stringify('0.3.0')
      }
    })
  ],

  module: {
    rules: [
      // {
      //   test: /\.global\.css$/,
      //   use: [
      //     {
      //       loader: 'style-loader'
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: true
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /^((?!\.global).)*\.css$/,
      //   use: [
      //     {
      //       loader: 'style-loader'
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //         sourceMap: true,
      //         importLoaders: 1,
      //         localIdentName: '[name]__[local]__[hash:base64:5]'
      //       }
      //     }
      //   ]
      // },
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
            limit: 10000,
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
            limit: 10000,
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
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        }
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
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
