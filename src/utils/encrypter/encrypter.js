const bcrypt = require('bcrypt')

class Encrypter {
  async compare (password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
  }
}

module.exports = {
  Encrypter
}
