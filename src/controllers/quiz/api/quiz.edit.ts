import { Request, Response } from 'express';
import { Quiz, QuizModel } from '../../../models/Quiz';

/**
 * Create a quiz in the system.
 */
export function editQuiz(req: Request, res: Response): Promise<any> | undefined {
  const quizToEdit = {
    id: req.body.id,
    name: req.body.title,
    description: req.body.description,
  };

  if (!quizToEdit.id) {
    res.status(200);
    res.json({
      success: false,
      message: 'Cannot update quiz. Quiz id is required.',
    });
    return;
  }

  return Quiz.findByIdAndUpdate(quizToEdit.id, quizToEdit)
    .then((quiz: QuizModel | null) => {
      res.status(200);
      res.json({
        success: true,
        message: 'Quiz information updated successfully.',
        data: {
          quizId: quiz?._id,
        },
      });
    })
    .catch((err) => {
      res.status(500);
      res.json({
        success: false,
        message: 'Cannot write the quiz in database!',
        data: err,
      });
    });
}
