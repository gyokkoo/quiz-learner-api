import { Request, Response } from 'express';
import { Quiz, QuizModel } from '../../../models/Quiz';

import { Question } from '../../../models//Question';
import { User } from '../../../models/User';

export function getQuizById(req: Request, res: Response): Promise<any> {
  const quizId: string = req?.params?.id;
  return Quiz.findById(quizId)
    .then((quiz: QuizModel | null) => {
      User.findById(quiz?.creatorId)
        .then((user: any) => {
          Question.find({ quizId }).then((allQuestions) => {
            const creator: string = user.username;

            const quizInfo = {
              creatorUsername: creator,
              creatorId: quiz?.creatorId,
              id: quiz?.id,
              name: quiz?.name,
              description: quiz?.description,
              dateCreated: quiz?.dateCreated,
              averageScore: quiz?.averageScore,
              questions: allQuestions,
            };

            res.status(200);
            res.json({
              success: true,
              message: `Questions loaded!`,
              data: quizInfo,
            });
          });
        })
        .catch((err) => {
          res.status(500);
          res.json({
            success: false,
            message: 'Cannot find user with id ' + quiz?.creatorId,
          });
        });
    })
    .catch((err) => {
      res.status(500);
      res.json({
        success: false,
        message: 'Cannot find quiz with id ' + quizId,
      });
    });
}
