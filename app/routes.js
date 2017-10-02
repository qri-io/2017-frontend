/* eslint-disable */
import React from 'react'
import { Switch, Route } from 'react-router';

import App from './containers/App'
import Console from './containers/Console'

export default () => (
  <App>
    <Switch>
      <Route path="/" component={Console} />
    </Switch>
  </App>
)
