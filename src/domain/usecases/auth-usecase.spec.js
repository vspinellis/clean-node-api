const { MissingParamError } = require('../../utils/errors')
const { AuthUseCase } = require('./auth-usecase')

const { LoadUserByEmailRepository } = require('src/infra/repositories/LoadUserBeEmailRepository')
jest.mock('src/infra/repositories/LoadUserBeEmailRepository')

const { Encrypter } = require('src/utils/encrypter/encrypter')
jest.mock('src/utils/encrypter/encrypter')

const { TokenGenerator } = require('src/utils/token-generator/token-generator')
jest.mock('src/utils/token-generator/token-generator')

describe('Auth UseCase', () => {
  let sut
  let loadUserByEmailRepositorySpy
  let encrypterSpy
  let tokenGeneratorSpy
  beforeEach(() => {
    loadUserByEmailRepositorySpy = new LoadUserByEmailRepository()
    encrypterSpy = new Encrypter()
    tokenGeneratorSpy = new TokenGenerator()
    sut = new AuthUseCase({ loadUserByEmailRepository: loadUserByEmailRepositorySpy, encrypter: encrypterSpy, tokenGenerator: tokenGeneratorSpy })
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

  test('deve retornar uma exceção se LoadUserByEmailRepository nao for passado', async () => {
    sut = new AuthUseCase({})
    await expect(() => sut.auth('valid_mail', 'valid_password')).rejects.toThrow(/* new MissingParamError('loadUserByEmailRepository' ) */)
  })

  test('deve retornar uma exceção se LoadUserByEmailRepository.load nao for passado', async () => {
    sut = new AuthUseCase({ loadUserByEmailRepository: {} })
    await expect(() => sut.auth('valid_mail', 'valid_password')).rejects.toThrow(/* new MissingParamError('loadUserByEmailRepository.load') */)
  })

  test('deve retornar uma exceção se nenhuma dependencia for passada', async () => {
    sut = new AuthUseCase()
    await expect(() => sut.auth('valid_mail', 'valid_password')).rejects.toThrow(/* new MissingParamError('loadUserByEmailRepository' ) */)
  })

  test('deve retornar null se email nao for encontrado', async () => {
    loadUserByEmailRepositorySpy.load.mockReturnValueOnce(null)
    const accessToken = await sut.auth('invalid_mail', 'any_password')
    expect(accessToken).toBe(null)
  })

  test('deve chamar o Encrypter com o valor correto', async () => {
    loadUserByEmailRepositorySpy.load.mockReturnValueOnce({
      password: 'hashed_password'
    })
    encrypterSpy.compare.mockReturnValueOnce(null)
    await sut.auth('valid_mail', 'any_password')
    expect(encrypterSpy.compare).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('deve retornar uma exceção se Encrypter nao for passado', async () => {
    sut = new AuthUseCase({ loadUserByEmailRepository: {} })
    await expect(() => sut.auth('valid_mail', 'valid_password')).rejects.toThrow(/* new MissingParamError('loadUserByEmailRepository' ) */)
  })

  test('deve retornar uma exceção se Encrypter.compare nao for passado', async () => {
    sut = new AuthUseCase({ loadUserByEmailRepository: { load: {} }, encrypter: {} })
    await expect(() => sut.auth('valid_mail', 'valid_password')).rejects.toThrow(/* new MissingParamError('loadUserByEmailRepository.load') */)
  })

  test('deve retornar null se senha não estiver correta', async () => {
    loadUserByEmailRepositorySpy.load.mockReturnValueOnce({})
    const accessToken = await sut.auth('any_mail', 'invalid_password')
    expect(accessToken).toBe(null)
  })

  test('deve chamar o TokenGenerator com os parametros corretos', async () => {
    const user = {
      id: 'any_id',
      password: 'any_password'
    }
    loadUserByEmailRepositorySpy.load.mockReturnValueOnce(user)
    encrypterSpy.compare.mockReturnValueOnce(true)
    await sut.auth('valid_mail', 'valid_password')

    expect(tokenGeneratorSpy.generate).toHaveBeenCalledWith(user.id)
  })

  test('deve retornar uma exceção se TokenGenerator nao for passado', async () => {
    sut = new AuthUseCase({ loadUserByEmailRepository: { load: {} }, encrypter: { compare: {} } })
    await expect(() => sut.auth('valid_mail', 'valid_password')).rejects.toThrow(/* new MissingParamError('loadUserByEmailRepository' ) */)
  })

  test('deve retornar uma exceção se TokenGenerator.generate nao for passado', async () => {
    sut = new AuthUseCase({ loadUserByEmailRepository: { load: {} }, encrypter: { compare: {}, tokenGenerator: {} } })
    await expect(() => sut.auth('valid_mail', 'valid_password')).rejects.toThrow(/* new MissingParamError('loadUserByEmailRepository.load') */)
  })

  test('deve retornar o token gerado no TokenValidator se as dados estiverem corretos', async () => {
    const user = {
      id: 'any_id',
      password: 'any_password'
    }
    loadUserByEmailRepositorySpy.load.mockReturnValueOnce(user)
    encrypterSpy.compare.mockReturnValueOnce(true)
    tokenGeneratorSpy.generate.mockResolvedValueOnce('token')
    const httpResponse = await sut.auth('valid_mail', 'valid_password')

    expect(httpResponse).toBe('token')
  })
})
