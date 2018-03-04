const crypto = require('crypto')

module.exports = {
  generateSalts: () => {
    crypto.randomBytes(128).toString('base64')
  },
  generateHashPassword: (salt, password) => {
    crypto.createHmac('sha256', salt).update(password).digest('hex')
  }
}
