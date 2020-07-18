import { Schema, model, Document } from 'mongoose';

export interface QuizModel extends Document {
  name: string;
  creatorId: string;
  creatorUsername: string;
  description: string;
  averageScroe: number;
  dateCreated: Date;
}

// eslint-disable-next-line new-cap
const quizSchema: Schema = new Schema({
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
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
  solved: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SolvedQuiz',
    },
  ],
  averageScore: { type: Schema.Types.Number, default: 0 },
  dateCreated: { type: Schema.Types.Date, default: Date.now },
});

export const Quiz = model<QuizModel>('Quiz', quizSchema);
