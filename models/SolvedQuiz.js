const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const solvedQuizSchema = mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: mongoose.Schema.Types.String,
  },
  solvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  questions: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Question',
  }],
  answers: [{ type: mongoose.Schema.Types.String }],
  score: { type: mongoose.Schema.Types.Number, default: 0 },
  dateSolved: { type: mongoose.Schema.Types.Date, default: Date.now },
});

const SolvedQuiz = mongoose.model('SolvedQuiz', solvedQuizSchema);

module.exports = SolvedQuiz;
