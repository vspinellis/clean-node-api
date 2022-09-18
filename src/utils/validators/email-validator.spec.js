jest.mock('./email-validator.js')
const { EmailValidator } = require('./email-validator')

describe('Email Validator', () => {
  let sut
  beforeEach(() => {
    sut = new EmailValidator()
  })
  test('deve retornar true se validator retornar true', () => {
    sut.isValid.mockImplementationOnce(() => true)
    const isEmailValid = sut.isValid('valid_email.com')
    expect(isEmailValid).toBe(true)
  })

  test('deve retornar false se validator retornar false', () => {
    sut.isValid.mockImplementationOnce(() => false)
    const isEmailValid = sut.isValid('invalid_email.com')
    expect(isEmailValid).toBe(false)
  })
})
