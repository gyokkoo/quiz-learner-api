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
    User.create(userData)
      .then(user => {
        req.logIn(user, (err, user) => {
          if (err) {
            res.locals.globalError = err
            res.status(200).send({ message: 'Wrong credentials!' })
            res.render('users/register', user)
            return
          }

          res.redirect('/')
          res.status(200).end()
        })
      }).catch(error => {
        res.locals.globalError = error
        // res.status(500).send({ message: error })
      })
  },
  loginGet: (req, res) => {
    res.render('users/login')
  },
  loginPost: (req, res) => {
    let userData = req.body
    User.findOne({username: userData.username}).then(user => {
      if (!user || !user.authenticate(userData.password)) {
        res.locals.globalError = 'Wrong credentials!'
        res.status(401).send({ message: 'Wrong credentials!' });
        res.render('users/login')
        return
      }

      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err
          res.status(401).send({ message: err });
          res.render('users/login')
          return
        }

        res.status(200).send(req.user);
      })
    }).catch(error => {
      res.locals.globalError = error
    })
  },
  logout: (req, res) => {
    req.logout()
    res.status(200);
    res.redirect('/')
    res.end()
  }
}
