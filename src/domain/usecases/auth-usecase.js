const { MissingParamError } = require('../../utils/errors')

class AuthUseCase {
  constructor (loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }

    if (!password) {
      throw new MissingParamError('password')
    }

    const checkEmailExists = await this.loadUserByEmailRepository.load(email)
    if (!checkEmailExists) {
      return null
    }
    return null
  }
}

module.exports = {
  AuthUseCase
}
