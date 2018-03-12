const mongoose = require('mongoose')

let quizSchema = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  questions: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Question'
  }]
})

let Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz
