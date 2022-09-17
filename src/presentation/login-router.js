const { serverError } = require('./helpers/server-error')
const { unauthorizedError } = require('./helpers/unauthorized-error')

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
    return unauthorizedError('Login ou senha inválidos')
  }
}

module.exports = {
  LoginRouter
}
