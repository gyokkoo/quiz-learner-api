const Question = require('../models/Question')

module.exports = {
  getScore: (questionsId, answers) => {
    let allQuestions = questionsId.length
    let correctAnswers = 0
    let wrongAnswers = 0
    let wrongAnswersIds = []

    for (let i = 0; i < allQuestions; i++) {
      Question.findById(questionsId[i]).then(question => {
        let isCorrect = true
        for (let j = 0; j < question.correctAnswers.length; j++) {
          if (!question.correctAnswers[j] || !answers[i][j]) {
            isCorrect = false
            break
          }
          if (question.correctAnswers[j] !== answers[i][j]) {
            isCorrect = false
            break
          }
        }

        if (isCorrect) {
          correctAnswers++
        } else {
          wrongAnswers++
          wrongAnswersIds.push(question._id)
        }

        // Last question traversed
        if (i === allQuestions - 1) {
          let result = {
            correctCount: correctAnswers,
            wrongCount: wrongAnswers,
            wrongIds: wrongAnswersIds,
            score: (correctAnswers / allQuestions) * 10
          }

          console.log(result)

          return result
        }
      }).catch(err => {
        console.log(err)
      })
    }
    return {}
  }
}
