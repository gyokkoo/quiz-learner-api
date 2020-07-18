import { Request, Response } from 'express';
import { Quiz, QuizModel } from '../../../models/Quiz';
import { SolvedQuiz } from '../../../models/SolvedQuiz';
import { Question } from '../../../models/Question';
import { User } from '../../../models/User';

export function getMostRecent(req: Request, res: Response): Promise<any> {
  return Quiz.find()
    .sort({ dataCreated: -1 })
    .limit(3)
    .then((mostRecentQuizzes) => {
      Quiz.count({}, function (err, quizzesCount) {
        if (err) {
          console.log(err);
          return;
        }

        SolvedQuiz.count({}, function (err, solvedQuizzesCount) {
          if (err) {
            console.log(err);
            return;
          }

          Question.count({}, function (err, questionsCount) {
            if (err) {
              console.log(err);
              return;
            }

            User.count({}, function (err, usersCount) {
              if (err) {
                console.log(err);
                return;
              }

              const result = {
                quizzes: mostRecentQuizzes,
                totalQuizzes: quizzesCount,
                totalSolvedQuizzes: solvedQuizzesCount,
                totalQuestions: questionsCount,
                totalUsers: usersCount,
              };

              res.status(200).json({
                success: true,
                message: 'Info loaded!',
                data: result,
              });
            });
          });
        });
      });
    });
}
