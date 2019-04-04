/**
 * Build config for electron renderer process
 */

import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import merge from 'webpack-merge'
import MinifyPlugin from 'babel-minify-webpack-plugin'
import baseConfig from './webpack.config.base'
import CheckNodeEnv from './internals/scripts/CheckNodeEnv'
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'

import version from './version'

CheckNodeEnv('production')

const appTarget = process.env.APP_TARGET || 'electron'

export default merge.smart(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  target: 'electron-renderer',
  entry: {
    'renderer': './lib/index.js',

    'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
    'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
    'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
    'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
    'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker'
  },

  output: {
    // monaco needs a "self" object:
    globalObject: 'self',
    path: path.join(__dirname, 'app/dist'),
    publicPath: './dist/',
    filename: '[name].prod.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // Extract all .global.css to style.css as is
      // {
      //   test: /\.global\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     use: 'css-loader',
      //     fallback: 'style-loader'
      //   })
      // },
      // Pipe other styles through css modules and append to style.css
      // {
      //   test: /^((?!\.global).)*\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     use: {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //         importLoaders: 1,
      //         localIdentName: '[name]__[local]__[hash:base64:5]'
      //       }
      //     }
      //   })
      // },
      // Add SASS support  - compile all .global.scss files and pipe it to style.css
      {
        test: /\.global\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ],
          fallback: 'style-loader'
        })
      },
      // Add SASS support  - compile all other .scss files and pipe it to style.css
      {
        test: /^((?!\.global).)*\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader'
          }]
        })
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
  },

  plugins: [
    new webpack.NormalModuleReplacementPlugin(/(.*)\.APP_TARGET(\.*)/, function (resource) {
      resource.request = resource.request.replace(/\.APP_TARGET/, `.${appTarget}`)
    }),
    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      '__BUILD__': {
        'MODE': JSON.stringify(process.env.NODE_ENV || 'production'),
        'DEBUG_PROD': JSON.stringify(process.env.DEBUG_PROD || false),

        'BASE_URL': JSON.stringify('http://localhost:2503'),
        'API_URL': JSON.stringify('http://localhost:2503'),
        'STATIC_ASSETS_URL': JSON.stringify('http://localhost:2503'),
        'ELECTRON': JSON.stringify('true'),
        'VERSION': JSON.stringify(version),

        'SEGMENT_KEY': JSON.stringify('--nope--')
      }
    }),

    new MonacoWebpackPlugin(),

    new MinifyPlugin({}, {
      sourceMap: null
    }),

    // https://github.com/bitinn/node-fetch/issues/41
    // new webpack.IgnorePlugin(/\/iconv-loader$/),

    new ExtractTextPlugin('style.css')

    // new BundleAnalyzerPlugin({
    //   analyzerMode: process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
    //   openAnalyzer: process.env.OPEN_ANALYZER === 'true'
    // })
  ]
})
