/* eslint-disable */
import React from 'react'
import { Switch, Route } from 'react-router';

import AppContainer from './containers/App'
import ConsoleContainer from './containers/Console'

export default () => (
  <AppContainer >
    <Switch>
      <Route path="/" component={ConsoleContainer} />
    </Switch>
  </AppContainer>
)
