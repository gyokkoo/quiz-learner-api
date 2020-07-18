import { Request, Response } from 'express';
import { Quiz } from '../../../models/Quiz';

import { Question } from '../../../models//Question';
import { User } from '../../../models/User';

export function getQuizById(req: Request, res: Response): Promise<any> {
  const quizId: string = req?.params?.id;
  return Quiz.findById(quizId)
    .then((quiz: any) => {
      User.findById(quiz.creatorId)
        .then((user: any) => {
          Question.find({ quizId }).then((allQuestions) => {
            const creator = user.username;
            res.status(200).json({
              success: true,
              message: `Questions loaded!`,
              allQuestions,
              quiz,
              creator,
            });
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: 'Cannot find user with id ' + quiz.creatorId,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Cannot find quiz with id ' + quizId,
      });
    });
}
