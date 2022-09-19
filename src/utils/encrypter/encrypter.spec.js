const { Encrypter } = require('./encrypter')

describe('Encrypter', () => {
  let sut
  beforeEach(() => {
    sut = new Encrypter()
  })
  test('deve retornar true se bcrypt retornar true', async () => {
    const isValid = await sut.compare('any_password', 'hashed_password')
    expect(isValid).toBe(true)
  })
})
