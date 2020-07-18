import { Request, Response } from 'express';
import { Quiz, QuizModel } from '../../../models/Quiz';

const sucessMessage: string = 'Quizzes loaded successfully!';
const noQuizzesFoundMessage: string = 'No quizzes found! Dare to add some?';
const errorMessage: string = 'Server error! Could not load quizzes!';

/**
 * Fetch all quizzes in the system.
 */
export function getAllQuizzes(req: Request, res: Response): Promise<any> {
  return Quiz.find()
    .then((quizzes: QuizModel[]) => {
      let message = sucessMessage;
      if (quizzes.length === 0) {
        message = noQuizzesFoundMessage;
      }

      res.status(200);
      return res.json({
        success: true,
        message: message,
        data: quizzes,
      });
    })
    .catch((err: any) => {
      res.status(500);
      return res.json({
        success: false,
        message: errorMessage,
      });
    });
}
