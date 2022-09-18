const { badRequestError, ok, serverError, unauthorizedError } = require('../errors')

class LoginRouter {
  constructor (authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!this.emailValidator.isValid(email)) {
        return badRequestError('Email inválido')
      }
      const accessToken = await this.authUseCase.auth(email, password)
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
