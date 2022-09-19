const { EmailValidator } = require('./email-validator')

const validator = require('validator').default
jest.mock('validator')

describe('Email Validator', () => {
  let sut
  let validatorFake
  beforeEach(() => {
    sut = new EmailValidator()
  })

  beforeAll(() => {
    validatorFake = validator
  })

  test('deve retornar true se validator retornar true', () => {
    validatorFake.isEmail.mockImplementation(() => true)
    const isEmailValid = sut.isValid('valid_email')
    expect(isEmailValid).toBe(true)
  })

  test('deve retornar false se validator retornar false', () => {
    validatorFake.isEmail.mockImplementation(() => false)
    const isEmailValid = sut.isValid('invalid_email')
    expect(isEmailValid).toBe(false)
  })

  test('deve garantir que o validator do emailValidator será chamado com o email correto', () => {
    sut.isValid('any_email')
    expect(validatorFake.isEmail).toHaveBeenCalledWith('any_email')
  })

  test.only('deve retornar uma exceção se o parametro email nao for recebido', () => {
    expect(() => sut.isValid()).toThrow(new Error())
  })
})
