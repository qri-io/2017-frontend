import React from 'react'
import App from './containers/App'

function errorLoading(err) {
	console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
	return (module) => cb(null, module.default);
}

export default {
	path : "/",
	component: App,
	getIndexRoute(location, cb) {
		System.import('./containers/Datasets').then(loadRoute(cb)).catch(errorLoading)
	},
	childRoutes: [
		{
			path: '/datasets',
			getComponent(location, cb) {
				System.import('./containers/Datasets').then(loadRoute(cb)).catch(errorLoading)
			},
		},
		{
			path: '/console',
			getComponent(location, cb) {
			  System.import('./containers/Console').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/login',
			getComponent(location, cb) {
			 System.import('./containers/Login').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/:handle',
			getComponent(location, cb) {
				System.import('./containers/User').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/:handle/:slug',
			getComponent(location, cb) {
				System.import('./containers/Dataset').then(loadRoute(cb)).catch(errorLoading);
			}
		}
 ]
};