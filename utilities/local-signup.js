const PassportLocalStrategy = require('passport-local').Strategy
const encryption = require('./encryption')
const User = require('mongoose').model('User')

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  let salt = encryption.generateSalt()
  const user = {
    username: username.trim(),
    hashedPass: encryption.generateHashedPassword(salt, password.trim()),
    salt: salt,
    firstName: req.body.firstName.trim(),
    lastName: req.body.firstName.trim(),
    age: req.body.age || 0,
    roles: ['User']
  }

  User.findOne({username: username}).then(user => {
    return done('Username already exists!')
  }).then(
    User
    .create(user).then(user => {
      return done(null)
    })
    .catch(err => {
      return done(err)
    })
  )

  // return done(null)
})
