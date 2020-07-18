import { Schema, model } from 'mongoose';

// eslint-disable-next-line new-cap
const questionSchema: Schema = new Schema({
  quizId: {
    type: Schema.Types.String,
    required: true,
  },
  question: {
    type: Schema.Types.String,
    required: true,
  },
  number: {
    type: Schema.Types.Number,
  },
  answers: [
    {
      answer: Schema.Types.String,
      isCorrect: Schema.Types.Boolean,
      formType: Schema.Types.String,
    },
  ],
  correctAnswers: [
    {
      type: Schema.Types.String,
    },
  ],
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const Question = model('Question', questionSchema);
