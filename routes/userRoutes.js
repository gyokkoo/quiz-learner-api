const express = require('express')
const passport = require('passport')

const router = new express.Router()

function validateData (data) {
  const errors = {}
  let isValid = true
  let message = ''
  console.log(data)
  /*
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
  */
  return {
    success: isValid,
    message,
    errors
  }
}

router.post('/register', (req, res, next) => {
  const validationResult = validateData(req.body)
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      console.log(1)
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
