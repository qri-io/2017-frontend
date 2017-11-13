/* globals __BUILD__ */
if (__BUILD__.MODE === 'production') {
  module.exports = require('./configureStore.prod')
} else if (__BUILD__.MODE === 'development') {
  module.exports = require('./configureStore.dev')
}
