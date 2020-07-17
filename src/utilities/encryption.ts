import crypto from 'crypto';

module.exports = { generateSalt, generateHashedPassword };

/**
 * Generates a random salt to be used
 */
export function generateSalt(): string {
  return crypto.randomBytes(128).toString('base64');
}

/**
 * Create a hashed password function
 */
export function generateHashedPassword(salt: string, password: string) {
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}
