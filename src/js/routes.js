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
		System.import('./containers/Console').then(loadRoute(cb)).catch(errorLoading)
	},
	childRoutes: [
		{
			path: '/datasets',
			getComponent(location, cb) {
				System.import('./containers/Datasets').then(loadRoute(cb)).catch(errorLoading)
			},
		},
		{
			path: '/login',
			getComponent(location, cb) {
			 System.import('./containers/Login').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/settings',
			getComponent(location, cb) {
				System.import('./containers/UserSettings').then(loadRoute(cb)).catch(errorLoading);
			},
			childRoutes : [
				{
					path : "/keys",
					getComponent(location, cb) {
						System.import('./containers/SshKeys').then(loadRoute(cb)).catch(errorLoading);
					}
				}
			]
		},
		{
			path : '/users/:user',
			getComponent(location, cb) {
				System.import('./containers/User').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path : '/users/:username/roles',
			getComponent(location, cb) {
				System.import('./containers/UserRoles').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/qri',
			getComponent(location, cb) {
				System.import('./containers/Dataset').then(loadRoute(cb)).catch(errorLoading);
			},
			// childRoutes: [
			// 	{
			// 		path: '/qri/:user',
			// 		getComponent(location, cb) {
			// 			System.import('./containers/User').then(loadRoute(cb)).catch(errorLoading);
			// 		}
			// 	},
			// 	{
			// 		path: '/qri/:user/queries/:slug',
			// 		getComponent(location, cb) {
			// 			System.import('./containers/Query').then(loadRoute(cb)).catch(errorLoading);
			// 		}
			// 	},
			// 	{
			// 		path: '/qri/:user/:dataset',
			// 		getComponent(location, cb) {
			// 			System.import('./containers/Dataset').then(loadRoute(cb)).catch(errorLoading);
			// 		}
			// 	},
			// 	{
			// 		path: '/qri/:user/:dataset/edit',
			// 		getComponent(location, cb) {
			// 			System.import('./containers/EditDataset').then(loadRoute(cb)).catch(errorLoading);
			// 		}
			// 	},

			// 	{
			// 		path: '/qri/:user/:dataset/changes',
			// 		getComponent(location, cb) {
			// 			System.import('./containers/DatasetChanges').then(loadRoute(cb)).catch(errorLoading);
			// 		}
			// 	},
			// 	{
			// 		path: '/qri/:user/:dataset/changes/new',
			// 		getComponent(location, cb) {
			// 			System.import('./containers/NewChange').then(loadRoute(cb)).catch(errorLoading);
			// 		}
			// 	},
			// 	{
			// 		path: '/qri/:user/:dataset/changes/:number',
			// 		getComponent(location, cb) {
			// 			System.import('./containers/Change').then(loadRoute(cb)).catch(errorLoading);
			// 		}
			// 	},
			// 	{
			// 		path: '/qri/:user/:dataset/changes/:edit',
			// 		getComponent(location, cb) {
			// 			System.import('./containers/EditChange').then(loadRoute(cb)).catch(errorLoading);
			// 		}
			// 	}
			// ]
		},
		{
			path: '/qri/*',
			getComponent(location, cb) {
				System.import('./containers/Dataset').then(loadRoute(cb)).catch(errorLoading);
			},
		}
		// {
		// 	path: '/datasets/new',
		// 	getComponent(location, cb) {
		// 		System.import('./containers/NewDataset').then(loadRoute(cb)).catch(errorLoading)
		// 	}
		// },
		// {
		// 	path: '/queries',
		// 	getComponent(location, cb) {
		// 		System.import('./containers/Queries').then(loadRoute(cb)).catch(errorLoading)
		// 	},
		// },
		// {
		// 	path: '/console',
		// 	getComponent(location, cb) {
		// 	  System.import('./containers/Console').then(loadRoute(cb)).catch(errorLoading);
		// 	}
		// },
 ]
};