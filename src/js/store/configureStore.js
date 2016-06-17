if (__BUILD__.PRODUCTION) {
  module.exports = require('./configureStore.prod')
} else if (__BUILD__.DEVELOP) {
  module.exports = require('./configureStore.dev')
}