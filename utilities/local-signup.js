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

  console.log(username)
  User.find({username: username}).then(user => {
    return done('Username already exists!')
  })

  User.create(user)
})
