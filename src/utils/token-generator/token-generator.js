const { sign } = require('jsonwebtoken')

class TokenGenerator {
  constructor (secret) {
    if (!secret) {
      throw new Error()
    }
    this.secret = secret
  }

  async generate (id) {
    return sign(id, this.secret)
  }
}

module.exports = {
  TokenGenerator
}
