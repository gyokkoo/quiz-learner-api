import crypto from 'crypto';

module.exports = {
  generateSalt: () => {
    return crypto.randomBytes(128).toString('base64')
  },
  generateHashedPassword: (salt: string, password: string) => {
    return crypto.createHmac('sha256', salt).update(password).digest('hex')
  }
}
