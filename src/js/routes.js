// TODO currently getting this linting error in standard - Parsing error: 'import' and 'export' may only appear at the top level
/* eslint-disable */
// import React from 'react'
import App from './containers/App'
import Console from './containers/Console'

function errorLoading (err) {
  console.error('Dynamic page loading failed', err)
}

function loadRoute (cb) {
  return (module) => cb(null, module.default)
}

export default {
  path: '/',
  component: App,
  indexRoute: { component: Console },
  // getIndexRoute(partialState, cb) {
  //   import('./containers/Namespace').then(loadRoute(cb)).catch(errorLoading)
  // },
  childRoutes: [
    {
      path: '/browse',
      getComponent (location, cb) {
        import('./containers/Datasets').then(loadRoute(cb)).catch(errorLoading)
      }
    },
    {
      path: '/login',
      getComponent (location, cb) {
       import('./containers/Login').then(loadRoute(cb)).catch(errorLoading)
      }
    },
    {
      path: '/settings',
      getComponent (location, cb) {
        import('./containers/UserSettings').then(loadRoute(cb)).catch(errorLoading)
      },
      childRoutes: [
        {
          path: '/keys',
          getComponent (location, cb) {
            import('./containers/SshKeys').then(loadRoute(cb)).catch(errorLoading)
          }
        }
      ]
    },
    {
      path: '/users/:user',
      getComponent (location, cb) {
        import('./containers/User').then(loadRoute(cb)).catch(errorLoading)
      }
    },
    {
      path: '/users/:username/roles',
      getComponent (location, cb) {
        import('./containers/UserRoles').then(loadRoute(cb)).catch(errorLoading)
      }
    },
    {
      path: '/namespace',
      getComponent (location, cb) {
        import('./containers/Namespace').then(loadRoute(cb)).catch(errorLoading)
      }
    },
    {
      path: '/*',
      getComponent (location, cb) {
        import('./containers/Console').then(loadRoute(cb)).catch(errorLoading)
      }
      // childRoutes: [
      //   {
      //     path: '/qri/:user',
      //     getComponent(location, cb) {
      //       import('./containers/User').then(loadRoute(cb)).catch(errorLoading)
      //     }
      //   },
      //   {
      //     path: '/qri/:user/queries/:slug',
      //     getComponent(location, cb) {
      //       import('./containers/Query').then(loadRoute(cb)).catch(errorLoading)
      //     }
      //   },
      //   {
      //     path: '/qri/:user/:dataset',
      //     getComponent(location, cb) {
      //       import('./containers/Dataset').then(loadRoute(cb)).catch(errorLoading)
      //     }
      //   },
      //   {
      //     path: '/qri/:user/:dataset/edit',
      //     getComponent(location, cb) {
      //       import('./containers/EditDataset').then(loadRoute(cb)).catch(errorLoading)
      //     }
      //   },

      //   {
      //     path: '/qri/:user/:dataset/changes',
      //     getComponent(location, cb) {
      //       import('./containers/DatasetChanges').then(loadRoute(cb)).catch(errorLoading)
      //     }
      //   },
      //   {
      //     path: '/qri/:user/:dataset/changes/new',
      //     getComponent(location, cb) {
      //       import('./containers/NewChange').then(loadRoute(cb)).catch(errorLoading)
      //     }
      //   },
      //   {
      //     path: '/qri/:user/:dataset/changes/:number',
      //     getComponent(location, cb) {
      //       import('./containers/Change').then(loadRoute(cb)).catch(errorLoading)
      //     }
      //   },
      //   {
      //     path: '/qri/:user/:dataset/changes/:edit',
      //     getComponent(location, cb) {
      //       import('./containers/EditChange').then(loadRoute(cb)).catch(errorLoading)
      //     }
      //   }
      // ]
    },
    {
      path: '/invites/:id',
      getComponent (location, cb) {
        import('./containers/Signup').then(loadRoute(cb)).catch(errorLoading)
      }
    }
    // {
    //   path: '/datasets/new',
    //   getComponent(location, cb) {
    //     import('./containers/NewDataset').then(loadRoute(cb)).catch(errorLoading)
    //   }
    // },
    // {
    //   path: '/queries',
    //   getComponent(location, cb) {
    //     import('./containers/Queries').then(loadRoute(cb)).catch(errorLoading)
    //   },
    // },
    // {
    //   path: '/console',
    //   getComponent(location, cb) {
    //     import('./containers/Console').then(loadRoute(cb)).catch(errorLoading)
    //   }
    // },
  ]
}
