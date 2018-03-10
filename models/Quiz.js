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
  questions: [{ type: mongoose.Schema.Types.String }],
  correctAnswers: [{ type: mongoose.Schema.Types.String }],
  wrongAnswers: [{ type: mongoose.Schema.Types.String }]
})

let Quiz = mongoose.model('Category', quizSchema)

module.exports = Quiz
