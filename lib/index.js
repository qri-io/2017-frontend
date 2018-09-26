/* globals __BUILD__ */
import React from 'react'
import { render } from 'react-dom'
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import './app.global.scss'
import './monaco'

const store = configureStore()

render(
  <ReactHotAppContainer>
    <Root store={store} />
  </ReactHotAppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root') // eslint-disable-line global-require
    render(
      <ReactHotAppContainer>
        <NextRoot store={store} />
      </ReactHotAppContainer>,
      document.getElementById('root')
    )
  })
}

// Analytics Snippit
// TODO - modularize Analytics
if (__BUILD__.MODE === 'production') {
  (function () {
    var analytics = window.analytics = window.analytics || []; if (!analytics.initialize) {
      if (analytics.invoked)window.console && console.error && console.error('Segment snippet included twice.'); else {
        analytics.invoked = !0; analytics.methods = ['trackSubmit', 'trackClick', 'trackLink', 'trackForm', 'pageview', 'identify', 'reset', 'group', 'track', 'ready', 'alias', 'page', 'once', 'off', 'on']; analytics.factory = function (t) { return function () { var e = Array.prototype.slice.call(arguments); e.unshift(t); analytics.push(e); return analytics } }; for (var t = 0; t < analytics.methods.length; t++) { var e = analytics.methods[t]; analytics[e] = analytics.factory(e) }analytics.load = function (t) { var e = document.createElement('script'); e.type = 'text/javascript'; e.async = !0; e.src = (document.location.protocol === 'https:' ? 'https://' : 'http://') + 'cdn.segment.com/analytics.js/v1/' + t + '/analytics.min.js'; var n = document.getElementsByTagName('script')[0]; n.parentNode.insertBefore(e, n) }; analytics.SNIPPET_VERSION = '3.1.0'
        analytics.load(__BUILD__.SEGMENT_KEY)
        analytics.page()
      }
    }
  }())
} else {
  // dummy analytics funcs
  window.analytics = {
    track () {},
    identify () {},
    page () {},
    load () {}
  }
}
