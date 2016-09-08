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
import Dataset from './containers/Dataset'
import DatasetChanges from './containers/DatasetChanges'
import DatasetMigrations from './containers/DatasetMigrations'
import EditDataset from './containers/EditDataset'
import EditMigration from './containers/EditMigration'
import NewChange from './containers/NewChange'
import Change from './containers/Change'
import NewMigration from './containers/NewMigration'
import Migration from './containers/Migration'

function errorLoading(err) {
	console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
	return (module) => cb(null, module.default);
}

export default {
	path : "/",
	component: App,
	indexRoute: Datasets, 
	childRoutes: [
		{
			path: '/datasets',
			component : Datasets
		},
		{
			path: '/datasets/new',
			component : NewDataset
		},
		{
			path: '/console',
			component : Console
		},
		{
			path: '/login',
			component : Login
		},
		{
			path: '/:user',
			component : User
		},
		{
			path: '/:user/:dataset',
			component : Dataset
		},
		{
			path: '/:user/:dataset/edit',
			component : EditDataset
		},

		{
			path: '/:user/:dataset/changes/new',
			component : NewChange
		},
		{
			path: '/:user/:dataset/changes',
			component : DatasetChanges
		},
		{
			path: '/:user/:dataset/changes/:number',
			component: Change
		},
		
		{
			path: '/:user/:dataset/migrations/new',
			component : NewMigration
		},
		{
			path: '/:user/:dataset/migrations',
			component : DatasetMigrations
		},
		{
			path: '/:user/:dataset/migrations/:number',
			component : Migration
		},
		{
			path: '/:user/:dataset/migrations/:number/edit',
			component : EditMigration
		},
 ]
};