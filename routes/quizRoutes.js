const express = require('express')
const authCheck = require('../middleware/auth-check')
const Quiz = require('../models/Quiz')
// const User = require('../models/User')

const router = new express.Router()

function validateQuizData (data) {
  const errors = {}
  let isValid = true
  let message = ''

  console.log(data)
  if (!data || typeof data.title !== 'string' || data.title < 3) {
    isValid = false
    errors.title = 'Title must be more than 2 symbols.'
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

router.post('/create', authCheck, (req, res) => {
  const quizData = req.body
  const validationResult = validateQuizData(quizData)
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  const quizToAdd = {
    name: quizData.title.trim(),
    description: quizData.description.trim(),
    creator: quizData.userId
  }
  console.log(quizToAdd)
  Quiz.create(quizToAdd).then(quiz => {
    if (!quiz) {
      return res.status(500).json({
        success: false,
        message: 'Cannot write the quiz in database',
        errors: 'Quiz error'
      })
    }
    res.status(200).json({
      success: true,
      message: `Quiz ${quiz.name} added!`,
      quiz
    })
  }).catch(err => {
    console.log('Error: ' + err)
    return res.status(500).json({
      success: false,
      message: 'Cannot write the quiz in database',
      errors: 'Quiz error'
    })
  })
})

module.exports = router
