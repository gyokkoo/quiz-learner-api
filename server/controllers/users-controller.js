const User = require('mongoose').model('User')
const encryption = require('../utilities/encryption')

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register')
  },
  registerPost: (req, res) => {
    let userData = req.body

    // TODO: Add validations
    if (userData.password && userData.password !== userData.repeatedPassword) {
      return res.status(400).send({ message: 'Passwords do not match' })
    }

    let salt = encryption.generateSalt()
    userData.salt = salt

    let hashedPassword = encryption.generateHashedPassword(salt, userData.password)
    if (userData.password) {
      userData.hashedPass = hashedPassword
    }

    console.log(userData)
    User.create(userData).then(user => {
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err
          res.render('users/register', user)
          return res.status(200).send({ message: 'Wrong credentials!' })
        }

        res.redirect('/')
        res.status(200).end()
      })
    }).catch(error => {
      res.status(500).send({ message: error })
    })
  }
}
