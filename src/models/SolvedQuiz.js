import { Schema, model } from 'mongoose';

// eslint-disable-next-line new-cap
const solvedQuizSchema = Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: Schema.Types.String,
  },
  solvedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  questions: [
    {
      type: Schema.ObjectId,
      ref: 'Question',
    },
  ],
  answers: [{ type: Schema.Types.String }],
  score: { type: Schema.Types.Number, default: 0 },
  dateSolved: { type: Schema.Types.Date, default: Date.now },
});

const SolvedQuiz = model('SolvedQuiz', solvedQuizSchema);

export default SolvedQuiz;
