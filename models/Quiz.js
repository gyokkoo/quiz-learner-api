const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const quizSchema = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  creatorUsername: {
    type: mongoose.Schema.Types.String,
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Question',
    },
  ],
  solved: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'SolvedQuiz',
    },
  ],
  averageScore: { type: mongoose.Schema.Types.Number, default: 0 },
  // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  dateCreated: { type: mongoose.Schema.Types.Date, default: Date.now },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
