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
			path: '/queries',
			getComponent(location, cb) {
				System.import('./containers/Queries').then(loadRoute(cb)).catch(errorLoading)
			},
		},
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
			path: '/:user',
			getComponent(location, cb) {
				System.import('./containers/User').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/:user/:dataset',
			getComponent(location, cb) {
				System.import('./containers/Dataset').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/:user/:dataset/edit',
			getComponent(location, cb) {
				System.import('./containers/EditDataset').then(loadRoute(cb)).catch(errorLoading);
			}
		},

		{
			path: '/:user/:dataset/changes',
			getComponent(location, cb) {
				System.import('./containers/DatasetChanges').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/:user/:dataset/changes/new',
			getComponent(location, cb) {
				System.import('./containers/NewChange').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/:user/:dataset/changes/:number',
			getComponent(location, cb) {
				System.import('./containers/Change').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/:user/:dataset/changes/:edit',
			getComponent(location, cb) {
				System.import('./containers/EditChange').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		
		{
			path: '/:user/:dataset/migrations',
			getComponent(location, cb) {
				System.import('./containers/DatasetMigrations').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/:user/:dataset/migrations/new',
			getComponent(location, cb) {
				System.import('./containers/NewMigration').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/:user/:dataset/migrations/:number',
			getComponent(location, cb) {
				System.import('./containers/Migration').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path : '/:user/:dataset/migrations/:number/edit',
			getComponent(location, cb) {
				System.import('./containers/EditMigration').then(loadRoute(cb)).catch(errorLoading);
			}
		}
 ]
};