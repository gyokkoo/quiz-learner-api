import { Request, Response } from 'express';
import { Quiz, QuizData } from '../../../models/Quiz';
import { ServerResponse } from '../../../interfaces/ServerResponse.interface';

/**
 * Create a quiz in the system.
 */
export function createQuiz(req: Request, res: Response): Promise<any> | undefined {
  const quizData = req.body;
  const validationResult = validateQuizData(quizData);
  if (!validationResult.success) {
    res.status(200);
    res.json(validationResult);
    return;
  }

  const quizToAdd: QuizData = {
    name: quizData.title.trim(),
    description: quizData.description.trim(),
    creatorId: quizData.userId,
    creatorUsername: quizData.creator,
    averageScore: 0,
    dateCreated: new Date(),
  };

  return Quiz.create(quizToAdd)
    .then((quiz) => {
      res.status(200).json({
        success: true,
        message: `Quiz ${quiz.name} added!`,
        data: {
          quizId: quiz._id,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: 'Cannot write the quiz in database!',
        data: err,
      });
    });
}

/**
 * Validate quiz data
 * @param {*} data Quiz data
 * @return {*} response object
 */
function validateQuizData(data: any): ServerResponse {
  let isValid = true;
  let message = '';

  console.log(data);
  if (!data || typeof data.title !== 'string' || data.title < 5) {
    isValid = false;
    message = 'Quiz title must be more than 5 symbols!';
  }

  if (!data || typeof data.description !== 'string' || data.description < 5) {
    isValid = false;
    message = 'Quiz description is required!';
  }

  return {
    success: isValid,
    message: message,
  };
}
