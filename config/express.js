const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const logger = require('morgan');

module.exports = (app) => {
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({
    extended: false}));
  app.use(bodyParser.json());

  app.use(passport.initialize());
  app.use(cors());

  app.use(logger('dev'));

  app.use(express.static('public'));

  console.log('Express is ready!');
};
