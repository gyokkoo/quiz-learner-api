import { Response, Request } from 'express';
import { Question } from '../../../models/Question';
import { Quiz } from '../../../models//Quiz';

export function editQuestion(req: Request, res: Response) {
  const id = req.params.id;
  const questionData = req.body;
  const questionToEdit = {
    quizId: questionData.quizId,
    question: questionData.question.trim(),
    answers: questionData.answers,
    correctAnswers: questionData.correctAnswers,
    number: questionData.questionNumber,
  };
  Question.findByIdAndUpdate(id, questionToEdit, { upsert: true }, function (
    err,
    doc
  ) {
    if (err) {
      res.send(500);
      res.json({ error: err });
    }
    console.log(doc);
    res.status(200).json({
      success: true,
      message: `Question ${questionToEdit.question} edited!`,
      questionToEdit,
    });
  }).catch((err) => {
    console.log('Error: ' + err);
    res.status(500);
    res.json({
      success: false,
      message: 'Cannot write the qusetion in database',
      errors: 'Question error',
    });
  });
}
