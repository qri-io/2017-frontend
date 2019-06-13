// adapted from https://storybook.js.org/docs/configurations/custom-webpack-config/

const path = require('path')

//  Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook

  // Custom rules pulled from ./webapp.config.webapp.prod.js
  config.module.rules.push(
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
    })

  // Return the altered config
  return config
}
