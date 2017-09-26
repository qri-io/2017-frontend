/*
 *
 * Gooby pls. Don 4get to update the prod routes.js file
 */
/* eslint-disable */
import React from 'react'
import App from './containers/App'
import Console from './containers/Console'

export default {
  path: '*',
  component: App,
  indexRoute: { component: Console }
}
