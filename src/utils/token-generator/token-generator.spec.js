const { TokenGenerator } = require('./token-generator')

const jsonwebtoken = require('jsonwebtoken')
jest.mock('jsonwebtoken')

describe('Token generator', () => {
  let sut
  let jsonwebtokenFake
  beforeEach(() => {
    sut = new TokenGenerator('secret')
  })

  beforeAll(() => {
    jsonwebtokenFake = jsonwebtoken
  })

  test('deve retornar null se JWT retornar null', async () => {
    jsonwebtokenFake.sign.mockImplementation(() => null)
    const token = await sut.generate('any_id')
    expect(token).toBe(null)
  })

  test('deve retornar token se JWT retornar token', async () => {
    jsonwebtokenFake.sign.mockImplementation(() => 'token')
    const token = await sut.generate('any_id')
    expect(token).toBe('token')
  })

  test('deve retornar token se JWT retornar token', async () => {
    await sut.generate('any_id')
    expect(jsonwebtokenFake.sign).toHaveBeenCalledWith('any_id', 'secret')
  })

  test('deve retornar erro se o secret JWT nao for fornecido', () => {
    expect(() => new TokenGenerator()).toThrow(new Error())
  })
})
