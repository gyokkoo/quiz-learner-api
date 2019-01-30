import { Schema, model } from 'mongoose'

let solvedQuizSchema = Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: Schema.Types.String
  },
  solvedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [{
    type: Schema.ObjectId,
    ref: 'Question'
  }],
  answers: [{ type: Schema.Types.String }],
  score: { type: Schema.Types.Number, default: 0 },
  dateSolved: { type: Schema.Types.Date, default: Date.now }
})

let SolvedQuiz = model('SolvedQuiz', solvedQuizSchema)

export default SolvedQuiz
