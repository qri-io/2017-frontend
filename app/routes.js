/* eslint-disable */
import React from 'react'
import { Switch, Route } from 'react-router';

import AppContainer from './containers/App'
import ConsoleContainer from './containers/Console'
import DatasetsContainer from './containers/Datasets'

export default () => (
  <AppContainer>
    <Switch>
      <Route path="/" component={ConsoleContainer} />
      <Route path="/datasets" component={DatasetsContainer} />
    </Switch>
  </AppContainer>
)
