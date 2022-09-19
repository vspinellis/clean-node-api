const bcrypt = require('bcrypt')

class Encrypter {
  async compare (password, hashedPassword) {
    if (!password || !hashedPassword) {
      throw new Error()
    }
    return bcrypt.compare(password, hashedPassword)
  }
}

module.exports = {
  Encrypter
}
