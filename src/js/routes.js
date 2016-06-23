import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Console from './containers/Console'
import Login from './containers/Login'
import ChartTest from './containers/ChartTest'

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Console}  />
		<Route path="/console" component={Console} />
		<Route path="/login" component={Login} />
	</Route>
);