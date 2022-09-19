const { Encrypter } = require('./encrypter')
// jest.mock('./encrypter')
const bcrypt = require('bcrypt')
jest.mock('bcrypt')

describe('Encrypter', () => {
  let sut
  let bcryptFake
  beforeEach(() => {
    sut = new Encrypter()
  })

  beforeAll(() => {
    bcryptFake = bcrypt
  })

  test('deve retornar true se bcrypt retornar true', async () => {
    bcryptFake.compare.mockResolvedValueOnce(true)
    const isValid = await sut.compare('any_password', 'hashed_password')
    expect(isValid).toBe(true)
  })

  test('deve retornar false se bcrypt retornar false', async () => {
    bcryptFake.compare.mockResolvedValueOnce(false)
    const isValid = await sut.compare('any_password', 'hashed_password')
    expect(isValid).toBe(false)
  })

  test('deve char o bcrypt com os parametros corretos', async () => {
    await sut.compare('any_password', 'hashed_password')
    expect(bcryptFake.compare).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('deve retornar uma exceção se os 2 parametros nao forem recebidos', async () => {
    await expect(sut.compare()).rejects.toThrow(new Error())
  })
})
