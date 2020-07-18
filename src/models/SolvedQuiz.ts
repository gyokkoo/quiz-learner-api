import { Schema, model } from 'mongoose';

// eslint-disable-next-line new-cap
const solvedQuizSchema = new Schema({
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
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
  answers: [{ type: Schema.Types.String }],
  score: { type: Schema.Types.Number, default: 0 },
  dateSolved: { type: Schema.Types.Date, default: Date.now },
});

export const SolvedQuiz = model('SolvedQuiz', solvedQuizSchema);
