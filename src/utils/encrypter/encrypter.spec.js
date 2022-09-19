const { Encrypter } = require('./encrypter')
const bcrypt = require('bcrypt')
jest.mock('bcrypt')

describe('Encrypter', () => {
  let sut
  let bcryptSpy
  beforeEach(() => {
    bcryptSpy = bcrypt
    sut = new Encrypter()
  })

  test('deve retornar true se bcrypt retornar true', async () => {
    bcryptSpy.compare.mockResolvedValueOnce(true)
    const isValid = await sut.compare('any_password', 'hashed_password')
    expect(isValid).toBe(true)
  })

  test('deve retornar false se bcrypt retornar false', async () => {
    bcryptSpy.compare.mockResolvedValueOnce(false)
    const isValid = await sut.compare('any_password', 'hashed_password')
    expect(isValid).toBe(false)
  })
})
