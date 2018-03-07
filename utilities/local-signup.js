const PassportLocalStrategy = require('passport-local').Strategy
const User = require('mongoose').model('User')

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  const user = {
    username: username.trim(),
    password: password.trim(),
    name: req.body.name.trim()
  }

  const existingUser = User.find({username: username})
  if (existingUser) {
    return done('Username already exists!')
  }

  User.create(user)
})
