const mongoose = require('mongoose')

let questionSchema = mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  question: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  number: {
    type: mongoose.Schema.Types.Number
  },
  answers: [{
    answer: mongoose.Schema.Types.String,
    isCorrect: mongoose.Schema.Types.Boolean
  }],
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question
