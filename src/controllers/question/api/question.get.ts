import { Request, Response } from 'express';
import { Question } from '../../../models/Question';

export function getQuestion(req: Request, res: Response) {
  const id = req.params.id;
  console.log(id);
  Question.find({ quizId: id })
    .then((questions) => {
      if (!questions) {
        res.status(400);
        res.json({
          success: false,
          message: 'No Questions. Care to add some?',
        });
        return;
      }
      console.log(questions);
      res.status(200).json({
        success: true,
        message: `Questions loaded!`,
        questions,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: 'Cannot find quiz with id ' + id,
        errors: err,
      });
    });
}
