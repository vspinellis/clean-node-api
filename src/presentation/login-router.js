const { serverError } = require('./helpers/server-error')

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return serverError()
    }
    const { email, password } = httpRequest.body
    this.authUseCase.auth(email, password)
  }
}

module.exports = {
  LoginRouter
}
