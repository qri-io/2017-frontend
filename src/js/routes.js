import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Console from './containers/Console'

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Console} />
	</Route>
);