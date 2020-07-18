import { Request, Response } from 'express';
import { Quiz } from '../../../models/Quiz';
import { Question } from '../../../models//Question';

export function deleteQuiz(req: Request, res: Response): Promise<any> {
  const quizId: string = req?.params?.id;
  return Quiz.findByIdAndRemove(quizId)
    .then((quiz: any) => {
      const questionsId = quiz.questions;
      for (const id of questionsId) {
        Question.findByIdAndRemove(id, (err, doc) => {
          if (err) {
            res.status(500);
            return res.json({
              success: false,
              message: 'Could not find quiz questions!',
            });
          }
        });
      }

      res.status(200);
      return res.json({
        success: true,
        message: 'Quiz removed!',
      });
    })
    .catch((err: any) => {
      if (err) {
        res.status(500);
        return res.json({
          success: false,
          message: 'Could not delete quiz!',
        });
      }
    });
}
