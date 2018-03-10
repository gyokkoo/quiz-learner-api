const mongoose = require('mongoose')

let categorySchema = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quizzes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' } ]
})

let Category = mongoose.model('Category', categorySchema)

module.exports = Category
