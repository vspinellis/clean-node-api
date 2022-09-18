const { AuthUseCase } = require('./auth-usecase')

describe('Auth UseCase', () => {
  let sut
  beforeEach(() => {
    sut = new AuthUseCase()
  })
  test('shoult return null if no email is provided', async () => {
    await expect(() => sut.auth()).rejects.toThrow()
  })
})
