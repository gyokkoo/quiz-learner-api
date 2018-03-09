const jwt = require('jsonwebtoken')
const User = require('mongoose').model('User')
const PassportLocalStrategy = require('passport-local').Strategy

module.exporta = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  const user = {
    username: username.trim(),
    hashedPass: password.trim()
  }

  let existingUser = User.find({username: username})

  if (!existingUser) {
    console.log('in error scope')
    const error = new Error('Incorecct username or password')
    error.name = 'IncorrectCredentialsError'

    return done(error)
  }

  const isMatch = existingUser.hashedPass === user.hashedPass
  if (!isMatch) {
    const error = new Error('Incorrect username or password')
    error.name = 'IncorrectCredentialsError'

    return done(error)
  }

  const payload = {
    sub: existingUser.id
  }

  // create a token string
  const token = jwt.sign(payload, 'c9ffcf6087a')
  const data = {
    name: existingUser.name
  }

  return done(null, token, data)
})
