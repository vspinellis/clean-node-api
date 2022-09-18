const { MissingParamError } = require('../../utils/errors')
const { AuthUseCase } = require('./auth-usecase')

const { LoadUserByEmailRepository } = require('src/infra/repositories/LoadUserBeEmailRepository')
jest.mock('src/infra/repositories/LoadUserBeEmailRepository')

describe('Auth UseCase', () => {
  let sut
  let loadUserByEmailRepositorySpy
  beforeEach(() => {
    loadUserByEmailRepositorySpy = new LoadUserByEmailRepository()
    sut = new AuthUseCase(loadUserByEmailRepositorySpy)
  })
  test('deve lançar um erro MissingParamError se o email nao for fornecido', async () => {
    await expect(() => sut.auth()).rejects.toThrow(new MissingParamError('email'))
  })

  test('deve lançar um erro MissingParamError se o password nao for fornecido', async () => {
    await expect(() => sut.auth('mail@mail.com')).rejects.toThrow(new MissingParamError('password'))
  })

  test('deve chamar o LoadUserByEmailRepository com o email correto', async () => {
    await sut.auth('valid_mail', 'valid_password')
    expect(loadUserByEmailRepositorySpy.load).toHaveBeenCalledWith('valid_mail')
  })
})
