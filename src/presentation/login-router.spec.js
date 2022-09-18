const { LoginRouter } = require('./login-router')

const { AuthUseCase } = require('../domain/usecases/auth-usecase')
jest.mock('../domain/usecases/auth-usecase.js')

const { EmailValidator } = require('../utils/validators/email-validator')
jest.mock('../utils/validators/email-validator.js')

describe('Login Router', () => {
  let sut
  let authUseCaseSpy
  let emailValidatorSpy
  beforeEach(() => {
    emailValidatorSpy = new EmailValidator()
    authUseCaseSpy = new AuthUseCase()
    sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy)
  })

  test('deve retornar 500 se httpRequest não for fornecido', async () => {
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toBe('Erro interno do servidor!')
  })

  test('deve retornar 500 se httpRequest.body não for fornecido', async () => {
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toBe('Erro interno do servidor!')
  })

  test('deve chamar o authUseCase com os parametros corretos', async () => {
    emailValidatorSpy.isValid.mockReturnValueOnce(true)
    const httpRequest = {
      body: {
        email: 'email@mail.com',
        password: 'password'
      }
    }
    await sut.route(httpRequest)
    expect(authUseCaseSpy.auth).toHaveBeenCalledWith(httpRequest.body.email, httpRequest.body.password)
    expect(authUseCaseSpy.auth).toHaveBeenCalledTimes(1)
  })

  test('deve retornar 401 se o authUseCase for chamado com os parametros incorretos', async () => {
    emailValidatorSpy.isValid.mockReturnValueOnce(true)
    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'password_invalid'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toBe('Login ou senha inválidos')
  })

  test('deve retornar 200 se o authUseCase for chamado com os parametros corretos', async () => {
    authUseCaseSpy.auth.mockResolvedValueOnce('123123213')
    emailValidatorSpy.isValid.mockReturnValueOnce(true)
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'password_valid'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toHaveProperty('accessToken')
    expect(authUseCaseSpy.auth).toHaveBeenCalledTimes(1)
  })

  test('deve retornar 500 se o AuthUseCase não for fornecido', async () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'password_valid'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toBe('Erro interno do servidor!')
  })

  test('deve retornar 500 se o AuthUseCase.auth não for fornecido', async () => {
    const sut = new LoginRouter({})
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'password_valid'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toBe('Erro interno do servidor!')
  })

  test('deve retornar 500 se o EmailValidator não for fornecido', async () => {
    const sut = new LoginRouter(authUseCaseSpy)
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'password_valid'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toBe('Erro interno do servidor!')
  })

  test('deve retornar 500 se o EmailValidator.isValid não for fornecido', async () => {
    const sut = new LoginRouter(authUseCaseSpy, {})
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'password_valid'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toBe('Erro interno do servidor!')
  })

  test('deve retornar 500 se o EmailValidator.isvalid retornar uma exceção', async () => {
    emailValidatorSpy.isValid.mockImplementationOnce(() => new Error('Erro ao validar o email'))
    const sut = new LoginRouter(authUseCaseSpy)
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'password_valid'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('deve retornar 400 se email nao for um email valido', async () => {
    emailValidatorSpy.isValid.mockReturnValue(false)
    const httpRequest = {
      body: {
        email: 'invalid_email',
        password: 'password_valid'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toBe('Email inválido')
  })
})
