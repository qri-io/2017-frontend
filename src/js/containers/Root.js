
if (__BUILD__.PRODUCTION) {
  module.exports = require('./Root.prod')
} else if (__BUILD__.DEVELOP) {
  module.exports = require('./Root.dev')
}