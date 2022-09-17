const { LoginRouter } = require('./login-router')

const { AuthUseCase } = require('../domain/usecases/auth-usecase')
jest.mock('../domain/usecases/auth-usecase.js')

describe('Login Router', () => {
  let sut
  let authUseCaseSpy
  beforeEach(() => {
    authUseCaseSpy = new AuthUseCase()
    sut = new LoginRouter(authUseCaseSpy)
  })

  test('deve retornar 500 se httpRequest não for fornecido', () => {
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('deve retornar 500 se httpRequest.body não for fornecido', () => {
    const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })

  test('deve chamar o authUseCase com os parametros corretos', () => {
    const httpRequest = {
      body: {
        email: 'email@mail.com',
        password: 'password'
      }
    }
    sut.route(httpRequest)
    expect(authUseCaseSpy.auth).toHaveBeenCalledWith(httpRequest.body.email, httpRequest.body.password)
  })

  test('deve retornar 401 se o authUseCase for chamado com os parametros incorretos', () => {
    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'password_invalid'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toBe('Login ou senha inválidos')
  })

  test('deve retornar 200 se o authUseCase for chamado com os parametros corretos', () => {
    authUseCaseSpy.auth.mockImplementation(() => Promise.resolve('123123213'))
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'password_valid'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toHaveProperty('accessToken')
  })

  test('deve retornar 500 se o AuthUseCase n"ao for fornecido', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'password_valid'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('deve retornar 500 se o AuthUseCase.auth n"ao for fornecido', () => {
    const sut = new LoginRouter({})
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'password_valid'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})
