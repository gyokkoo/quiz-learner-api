const jwt = require('jsonwebtoken')
const User = require('mongoose').model('User')
const PassportLocalStrategy = require('passport-local').Strategy

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, inputUsername, password, done) => {
  User.findOne({ username: inputUsername }).then(user => {
    if (!user || !user.authenticate(password)) {
      return done('Incorecct username or password')
    }

    const payload = {
      sub: user._id
    }

    const token = jwt.sign(payload, 'c9ffcf6087a')
    const data = {
      name: user.username,
      id: user._id
    }

    return done(null, token, data)
  }).catch((err) => {
    return done(err)
  })
})
