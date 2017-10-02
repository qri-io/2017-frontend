/**
 * Webpack config for production electron main process
 */

import webpack from 'webpack'
import merge from 'webpack-merge'
import BabiliPlugin from 'babili-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import baseConfig from './webpack.config.base'
import CheckNodeEnv from './internals/scripts/CheckNodeEnv'

CheckNodeEnv('production')

export default merge.smart(baseConfig, {
  devtool: 'source-map',

  target: 'electron-main',

  entry: './src/main.dev',

  // 'main.js' in root
  output: {
    path: __dirname,
    filename: './src/main.prod.js'
  },

  plugins: [
    /**
     * Babli is an ES6+ aware minifier based on the Babel toolchain (beta)
     */
    new BabiliPlugin(),

    new BundleAnalyzerPlugin({
      analyzerMode: process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
      openAnalyzer: process.env.OPEN_ANALYZER === 'true'
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
      'process.env.DEBUG_PROD': JSON.stringify(process.env.DEBUG_PROD || 'false'),
      __BUILD__: {
        PRODUCTION: JSON.stringify(false),
        DEVELOP: JSON.stringify(true),
        STAGING: JSON.stringify(false),

        BASE_URL: JSON.stringify('http://localhost:3000'),
        API_URL: JSON.stringify('http://localhost:3000'),
        STATIC_ASSETS_URL: JSON.stringify('http://localhost:3000')
        // SEGMENT_KEY: JSON.stringify('not_a_key')
      }
    })
  ],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  }
})
