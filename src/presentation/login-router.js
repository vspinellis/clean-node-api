const { ok } = require('./helpers/httpResponse/ok')
const { serverError } = require('./helpers/httpResponse/server-error')
const { unauthorizedError } = require('./helpers/httpResponse/unauthorized-error')

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.authUseCase || !this.authUseCase.auth) {
      return serverError()
    }
    const { email, password } = httpRequest.body
    const accessToken = this.authUseCase.auth(email, password)
    console.log(accessToken)
    if (!accessToken) {
      return unauthorizedError('Login ou senha inválidos')
    }

    return ok({ accessToken })
  }
}

module.exports = {
  LoginRouter
}
