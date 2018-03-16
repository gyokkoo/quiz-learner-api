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
    type: mongoose.Schema.Types.String
  }],
  correctAnswers: [{
    type: mongoose.Schema.Types.String
  }],
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question
