const express = require('express')
const passport = require('passport')

const router = new express.Router()

function validateRegisterData (data) {
  const errors = {}
  let isValid = true
  let message = ''
  console.log(data)
  if (!data || typeof data.password !== 'string' || data.password.trim().length < 4) {
    isValid = false
    errors.password = 'Password must have at least 4 characters.'
  }

  if (!data || typeof data.firstName !== 'string' || data.firstName.trim().length === 0) {
    isValid = false
    errors.name = 'Please provide your name.'
  }

  if (!data || typeof data.lastName !== 'string' || data.lastName.trim().length === 0) {
    isValid = false
    errors.name = 'Please provide your name.'
  }

  if (!isValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isValid,
    message,
    errors
  }
}

function validateLoginData (data) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!data || typeof data.username !== 'string' || data.username.trim().length === 0) {
    isFormValid = false
    errors.username = 'Please provide your username.'
  }

  if (!data || typeof data.password !== 'string' || data.password.trim().length === 0) {
    isFormValid = false
    errors.password = 'Please provide your password.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginData(req.body)
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      console.log(err)
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(200).json({
          success: false,
          message: err.message
        })
      }

      return res.status(200).json({
        success: false,
        message: 'Could not process the form.'
      })
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    })
  })(req, res, next)
})

router.post('/register', (req, res, next) => {
  const validationResult = validateRegisterData(req.body)
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      console.log(err)
      return res.status(200).json({
        success: false,
        message: err
      })
    }

    console.log('No err')
    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    })
  })(req, res, next)
})

module.exports = router
