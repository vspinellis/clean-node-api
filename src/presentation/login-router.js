const { serverError } = require('./helpers/server-error')

class LoginRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return serverError()
    }
  }
}

module.exports = {
  LoginRouter
}
