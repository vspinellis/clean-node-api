const { LoginRouter } = require('./login-router')

describe('Login Router', () => {
  let sut
  let authUseCaseSpy
  beforeEach(() => {
    authUseCaseSpy = {
      auth: jest.fn()
    }
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
})
