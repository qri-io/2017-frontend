/* globals __BUILD__ */
if (__BUILD__.PRODUCTION) {
  module.exports = require('./configureStore.prod')
} else if (__BUILD__.STAGING) {
  module.exports = require('./configureStore.prod')
} else if (__BUILD__.DEVELOP) {
  module.exports = require('./configureStore.dev')
} else if (__BUILD__.DESKTOP) {
  module.exports = require('./configureStore.desktop')
}
