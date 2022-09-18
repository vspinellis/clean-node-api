const { EmailValidator } = require('./email-validator')

jest.mock('./email-validator.js')

describe('Email Validator', () => {
  let sut
  beforeEach(() => {
    sut = new EmailValidator()
  })
  test('deve retornar true se validator retornar true', () => {
    sut.isValid.mockImplementationOnce(() => true)
    const isEmailValid = sut.isValid('valid_email')
    expect(isEmailValid).toBe(true)
  })

  test('deve retornar false se validator retornar false', () => {
    sut.isValid.mockImplementationOnce(() => false)
    const isEmailValid = sut.isValid('invalid_email')
    expect(isEmailValid).toBe(false)
  })

  test('deve garantir que o emailValidator será chamado com o email correto', () => {
    sut.isValid('any_email')
    expect(sut.isValid).toHaveBeenCalledWith('any_email')
  })
})
