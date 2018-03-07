const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const handlebars = require('express-handlebars')
const cors = require('cors')
const logger = require('morgan')

module.exports = (app) => {
  app.engine('handlebars', handlebars({
    defaultLayout: 'main'
  }))

  app.set('view engine', 'handlebars')

  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(passport.initialize())
  app.use(cors())

  app.use(logger('dev'))

  /*
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
    }

    next()
  })
  */

  app.use(express.static('public'))

  console.log('Express is ready!')
}
