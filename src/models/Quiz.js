import { Schema, model } from 'mongoose';

// eslint-disable-next-line new-cap
const quizSchema = Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  creatorUsername: {
    type: Schema.Types.String,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  questions: [
    {
      type: Schema.ObjectId,
      ref: 'Question',
    },
  ],
  solved: [
    {
      type: Schema.ObjectId,
      ref: 'SolvedQuiz',
    },
  ],
  averageScore: { type: Schema.Types.Number, default: 0 },
  // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  dateCreated: { type: Schema.Types.Date, default: Date.now },
});

export const Quiz = model('Quiz', quizSchema);
