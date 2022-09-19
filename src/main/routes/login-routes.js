const { AuthUseCase } = require('src/domain/usecases/auth-usecase')
const { LoadUserByEmailRepository } = require('src/infra/repositories/load-user-by-email-repository')
const { LoginRouter } = require('src/presentation/routes/login-router')
const { Encrypter } = require('src/utils/encrypter/encrypter')
const { TokenGenerator } = require('src/utils/token-generator/token-generator')
const { EmailValidator } = require('src/utils/validators/email-validator')

module.exports = router => {
  const loadUserByEmailRepository = new LoadUserByEmailRepository()
  const encrypter = new Encrypter()
  const tokenGenerator = new TokenGenerator('secret')
  const authUseCase = new AuthUseCase({ loadUserByEmailRepository, encrypter, tokenGenerator })
  const emailValidator = new EmailValidator()
  const loginRouter = new LoginRouter(authUseCase, emailValidator)
  router.post('/login', loginRouter)
}
