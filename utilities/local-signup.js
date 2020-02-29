const PassportLocalStrategy = require('passport-local').Strategy;
const encryption = require('./encryption');
const User = require('mongoose').model('User');

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, username, password, done) => {
  const salt = encryption.generateSalt();
  const user = {
    username: username.trim(),
    hashedPass: encryption.generateHashedPassword(salt, password.trim()),
    salt: salt,
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    roles: ['User'],
  };

  User.create(user)
      .then((user) => {
        console.log(`Username successfully registered ${user.username}`);
        return done(null);
      }).catch(() => {
        return done('Username already exists!');
      });
});
