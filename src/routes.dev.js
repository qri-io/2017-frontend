/*
 *
 * Gooby pls. Don 4get to update the prod routes.js file
 */
/* eslint-disable */
import React from 'react'
import { Switch, Route } from 'react-router';

import App from './containers/App'
import Console from './containers/Console'

// import AddDataset from './containers/AddDataset'
// import App from './containers/App'
// import Change from './containers/Change'
// import Console from './containers/Console'
// import Dataset from './containers/Dataset'
// import DatasetChanges from './containers/DatasetChanges'
// import DatasetMigrations from './containers/DatasetMigrations'
// import Datasets from './containers/Datasets'
// import EditChange from './containers/EditChange'
// import EditDataset from './containers/EditDataset'
// import Login from './containers/Login'
// import Namespace from './containers/Namespace'
// import NewDataset from './containers/NewDataset'
// import NewChange from './containers/NewChange'
// import Signup from './containers/Signup'
// import Queries from './containers/Queries'
// import Query from './containers/Query'
// import Stylesheet from './containers/Stylesheet'
// import SshKeys from './containers/SshKeys'
// import User from './containers/User'
// import UserRoles from './containers/UserRoles'
// import UserSettings from './containers/UserSettings'

export default () => (
  <App>
    <Switch>
      <Route path="/" component={Console} />
    </Switch>
  </App>
)
