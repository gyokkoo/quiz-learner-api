import { Strategy as PassportLocalStrategy } from 'passport-local';
import { generateSalt, generateHashedPassword } from './encryption';
const User = require('mongoose').model('User');

export default new PassportLocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    const salt = generateSalt();
    const user = {
      username: username.trim(),
      hashedPass: generateHashedPassword(salt, password.trim()),
      salt: salt,
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      roles: ['User'],
    };

    User.create(user)
      .then((user) => {
        console.log(`Username successfully registered ${user.username}`);
        return done(null);
      })
      .catch((err) => {
        console.log(err);
        return done('Username already exists!');
      });
  }
);
