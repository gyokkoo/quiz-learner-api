const jwt = require('jsonwebtoken')
const User = require('../models/User')

const PassportLocalStrategy = require('passport-local').Strategy
// const encryption = require('./encryption')

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
 // let userSalt
 // let userHashedPass

  User.findOne({username: username}).then(user => {
    if (!user || user.authenticate(password)) {
      return done('Incorecct username or password')
    }

    const payload = {
      sub: user._id
    }

    // create a token string
    const token = jwt.sign(payload, 'c9ffcf6087a')
    const data = {
      name: user.name
    }

    return done(null, token, data)
  })
  // if (!existingUser) {
  //   const error = new Error('Incorecct username or password')
  //   error.name = 'IncorrectCredentialsError'

  //   return done(error)
  // }

  // const isMatch = userHashedPass === encryption.generateHashedPassword(userSalt, password.trim())
  // if (!isMatch) {
  //   const error = new Error('Incorrect username or password')
  //   error.name = 'IncorrectCredentialsError'

  //   return done(error)
  // }
})
