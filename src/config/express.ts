import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import logger from 'morgan';

module.exports = (app) => {
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(passport.initialize())
  // app.use(cors())

  app.use(logger('dev'))

  app.use(express.static('public'))

  console.log('Express is ready!')
}
