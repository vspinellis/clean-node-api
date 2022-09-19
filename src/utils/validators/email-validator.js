const { isEmail } = require('validator').default

class EmailValidator {
  isValid (email) {
    if (!email) {
      throw new Error()
    }
    return isEmail(email)
  }
}

module.exports = {
  EmailValidator
}
