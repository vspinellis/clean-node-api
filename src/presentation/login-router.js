const { ok } = require('./helpers/httpResponse/ok')
const { serverError } = require('./helpers/httpResponse/server-error')
const { unauthorizedError } = require('./helpers/httpResponse/unauthorized-error')

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      const accessToken = this.authUseCase.auth(email, password)
      if (!accessToken) {
        return unauthorizedError('Login ou senha inválidos')
      }

      return ok({ accessToken })
    } catch (error) {
      return serverError()
    }
  }
}

module.exports = {
  LoginRouter
}
