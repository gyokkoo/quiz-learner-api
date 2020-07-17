const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const questionSchema = mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  number: {
    type: mongoose.Schema.Types.Number,
  },
  answers: [
    {
      answer: mongoose.Schema.Types.String,
      isCorrect: mongoose.Schema.Types.Boolean,
      formType: mongoose.Schema.Types.String,
    },
  ],
  correctAnswers: [
    {
      type: mongoose.Schema.Types.String,
    },
  ],
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
