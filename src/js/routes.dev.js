/*
 * 
 * Gooby pls. Don 4get to update the prod routes.js file 
 */
import React from 'react'
import App from './containers/App'
import Datasets from './containers/Datasets'
import NewDataset from './containers/NewDataset'
import Console from './containers/Console'
import Login from './containers/Login'
import User from './containers/User'
import UserRoles from './containers/UserRoles'
import UserSettings from './containers/UserSettings'
import Signup from './containers/Signup'
import Stylesheet from './containers/Stylesheet'
import SshKeys from './containers/SshKeys'
import Dataset from './containers/Dataset'
import DatasetChanges from './containers/DatasetChanges'
import DatasetMigrations from './containers/DatasetMigrations'
import EditChange from './containers/EditChange'
import EditDataset from './containers/EditDataset'
import NewChange from './containers/NewChange'
import Change from './containers/Change'
import Queries from './containers/Queries'
import Query from './containers/Query'
import Welcome from './containers/Welcome'

function errorLoading(err) {
	console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
	return (module) => cb(null, module.default);
}

export default {
	path : "/",
	component: App,
	indexRoute: Console, 
	childRoutes: [
		{
			path: '/browse',
			component : Datasets
		},
		{
			path: '/login',
			component : Login
		},
		{
			path: '/settings',
			component : UserSettings
		},
		{
			path: '/settings/keys',
			component : SshKeys
		},
		{
			path: '/users/:user',
			component: User
		},
		{
			path : '/users/:username/roles',
			component: UserRoles
		},
		{
			path: '/qri',
			component : Dataset
		},
		{
			path: '/qri/*',
			component : Dataset
		},
		{
			path: '/invites/:id',
			component : Signup
		},
		{
			path: '/welcome',
			component: Welcome
		},
		{
			path: '/stylesheet',
			component: Stylesheet
		}
		// {
		// 	path: '/datasets/new',
		// 	component : NewDataset
		// },
		// {
		// 	path: '/console',
		// 	component : Console
		// },
		// {
		// 	path: '/qri/:user',
		// 	component : User
		// },
		// {
		// 	path: '/:user/queries/:slug',
		// 	component : Query
		// },
		// {
		// 	path: '/qri/:user/:dataset',
		// 	component : Dataset
		// },
		// {
		// 	path: '/qri/:user/:dataset/edit',
		// 	component : EditDataset
		// },
		// {
		// 	path: '/qri/:user/:dataset/changes/new',
		// 	component : NewChange
		// },
		// {
		// 	path: '/qri/:user/:dataset/changes',
		// 	component : DatasetChanges
		// },
		// {
		// 	path: '/qri/:user/:dataset/changes/:number',
		// 	component: Change
		// },
		// {
		// 	path: '/qri/:user/:dataset/changes/:number/edit',
		// 	component: EditChange
		// }
 ]
};