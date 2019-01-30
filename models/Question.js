import { Schema, model } from 'mongoose'

let questionSchema = Schema({
  quizId: {
    type: Schema.Types.String,
    required: true
  },
  question: {
    type: Schema.Types.String,
    required: true
  },
  number: {
    type: Schema.Types.Number
  },
  answers: [{
    type: Schema.Types.String
  }],
  correctAnswers: [{
    type: Schema.Types.String
  }],
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

let Question = model('Question', questionSchema)

export default Question
