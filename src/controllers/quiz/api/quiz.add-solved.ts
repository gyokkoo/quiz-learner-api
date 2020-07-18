import { Request, Response } from 'express';
import { SolvedQuiz } from '../../../models/SolvedQuiz';
import { Question } from '../../../models//Question';

export function addSolvedQuiz(req: Request, res: Response): any {
  const quizData = req.body;
  const solvedQuiz = {
    quizId: quizData.quizId,
    solvedBy: quizData.userId,
    questions: quizData.questions,
    answers: quizData.answers,
    dateSolved: new Date(),
  };
  // TODO: validate!
  getScore(quizData.questions, quizData.answers, function (scoreResult: any) {
    SolvedQuiz.create(solvedQuiz)
      .then((quiz) => {
        res.status(200).json({
          success: true,
          message: `Solved Quiz added!`,
          quiz,
          scoreResult,
        });
      })
      .catch((err) => {
        console.log('Error: ' + err);
        return res.status(500).json({
          success: false,
          message: 'Cannot write the solved quiz in database',
          errors: 'Quiz solved error',
        });
      });
  });
}

function getScore(questionsId: string, answers: any, _callback: any) {
  const allQuestions = questionsId.length;
  const wrongAnswers: any[] = [];
  const correctAnswers: any[] = [];
  for (let i = 0; i < allQuestions; i++) {
    Question.findById(questionsId[i])
      .then((question: any) => {
        let isCorrect = true;
        for (let j = 0; j < question.correctAnswers.length; j++) {
          if (!question.correctAnswers[j] || !answers[i][j]) {
            isCorrect = false;
            break;
          }
          if (question.correctAnswers[j] !== answers[i][j]) {
            isCorrect = false;
            break;
          }
        }

        const answer: any = {
          question: question.question,
          answer: answers[i],
        };

        if (isCorrect) {
          correctAnswers.push(answer);
        } else {
          answer.correctAnswer = question.correctAnswers;
          wrongAnswers.push(answer);
        }

        // Last question traversed
        if (i === allQuestions - 1) {
          const result = {
            correctCount: correctAnswers.length,
            wrongCount: wrongAnswers.length,
            wrongAnswers: wrongAnswers,
            correctAnswers: correctAnswers,
            score: ((correctAnswers.length / allQuestions) * 10).toFixed(2),
          };

          console.log(result);
          _callback(result);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  return {};
}
