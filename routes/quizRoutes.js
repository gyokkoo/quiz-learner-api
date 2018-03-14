const express = require('express')
const authCheck = require('../middleware/auth-check')
const Quiz = require('../models/Quiz')
const Question = require('../models/Question')

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
  // console.log(quizToAdd)
  Quiz.create(quizToAdd).then(quiz => {
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

router.post('/addQuestion', authCheck, (req, res) => {
  const questionData = req.body
  // TODO: validate!
  // const validationResult = validateQuestionData(questionData)
  // if (!validationResult.success) {
  //   return res.status(200).json({
  //     success: false,
  //     message: validationResult.message,
  //     errors: validationResult.errors
  //   })
  // }

  const questionToAdd = {
    quizId: questionData.quizId,
    question: questionData.questionName.trim(),
    answers: questionData.answers,
    correctAnswers: questionData.correctAnswers,
    number: questionData.questionNumber
  }
  console.log(questionToAdd)
  Question.create(questionToAdd).then(question => {
    res.status(200).json({
      success: true,
      message: `Question ${question.question} added!`,
      question
    })
  }).catch(err => {
    console.log('Error: ' + err)
    return res.status(500).json({
      success: false,
      message: 'Cannot write the qusetion in database',
      errors: 'Question error'
    })
  })
})

router.get('/getAllQuizzes', (req, res) => {
  Quiz
    .find()
    .then(quizzes => {
      // console.log(quizzes)
      res.status(200).json({
        success: true,
        message: `Quizzes loaded!`,
        quizzes
      })
    }).catch(err => {
      console.log(err)
      res.status(400).json({
        success: false,
        message: 'No Quizzes. Care to add some?',
        error: 'Quiz error'
      })
    })
})

router.get('/getQuestions/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  Question.find({quizId: id}).then(questions => {
    if (!questions) {
      res.status(400).json({ message: 'No Questions. Care to add some?' })
      return
    }
    console.log(questions)
    res.status(200).json({
      success: true,
      message: `Questions loaded!`,
      questions
    })
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Cannot find quiz with id ' + id,
      errors: err
    })
  })
})

router.get('/getQuizById/:id', (req, res) => {
  const id = req.params.id
  // console.log(id)
  Quiz.findById(id).then(quiz => {
    console.log(quiz)
    res.status(200).json({
      success: true,
      message: `Questions loaded!`,
      quiz
    })
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Cannot find quiz with id ' + id,
      errors: err
    })
  })
})

module.exports = router
