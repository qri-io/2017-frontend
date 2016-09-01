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
			path: '/datasets/new',
			getComponent(location, cb) {
				System.import('./containers/NewDataset').then(loadRoute(cb)).catch(errorLoading)
			}
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
		},

		{
			path: '/:handle/:slug/changes/new',
			getComponent(location, cb) {
				System.import('./containers/NewChange').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/:handle/:slug/changes/:number',
			getComponent(location, cb) {
				System.import('./containers/Change').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		
		{
			path: '/:handle/:slug/migrations/new',
			getComponent(location, cb) {
				System.import('./containers/NewMigration').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/:handle/:slug/migrations/:number',
			getComponent(location, cb) {
				System.import('./containers/Migration').then(loadRoute(cb)).catch(errorLoading);
			}
		},
 ]
};