import { Response, Request } from 'express';
import { Question } from '../../../models/Question';
import { Quiz } from '../../../models//Quiz';

export function createQuestion(req: Request, res: Response): Promise<any> {
  const questionData = req.body;
  const questionToAdd = {
    quizId: questionData.quizId,
    question: questionData.question,
    answers: questionData.answers,
    shouldShuffle: questionData.shouldShuffle,
  };

  return Question.create(questionToAdd)
    .then((question: any) => {
      const quizId = question.quizId;
      const questionId = question._id;
      Quiz.findByIdAndUpdate(quizId, { $push: { questions: questionId } }, { upsert: true })
        .then(() => {
          res.status(200);
          res.json({
            success: true,
            message: `Question ${question.question} added!`,
            data: question,
          });
        })
        .catch((err) => {
          res.status(500);
          res.json({
            success: false,
            message: 'Could not update question!',
            data: err,
          });
        });
    })
    .catch((err: any) => {
      res.status(500);
      res.json({
        success: false,
        message: 'Error! Cannot create question.',
      });
    });
}
