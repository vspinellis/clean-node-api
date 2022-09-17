const { LoginRouter } = require('./login-router')

describe('Login Router', () => {
  let sut
  beforeEach(() => {
    sut = new LoginRouter()
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

  })
})
