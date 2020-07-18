import { Request, Response } from 'express';
import { Quiz } from '../../../models/Quiz';

const sucessMessage: string = 'Quizzes loaded successfully!';
const errorMessage: string = 'Server error! Could not load quizzes!';

/**
 * Fetch all quizzes in the system.
 */
export function getAllQuizzes(req: Request, res: Response): void {
  Quiz.find()
    .then((quizzes: any) => {
      res.status(200).json({
        success: true,
        message: sucessMessage,
        data: quizzes,
      });
    })
    .catch((err: any) => {
      console.log(err);

      res.status(500).json({
        success: false,
        message: errorMessage,
      });
    });
}
