import { Response, Request } from 'express';
import { Question } from '../../../models/Question';

export function deleteQuestion(req: Request, res: Response) {
  const id = req.params.id;
  Question.findByIdAndRemove(id, function (err, doc) {
    if (err) {
      res.send(500);
      res.json({
        success: false,
        message: "Could not find question!",
      });
    }
    console.log(doc);
    res.status(200).json({
      success: true,
      message: `Question removed!`,
    });
  }).catch((err) => {
    console.log('Error: ' + err);
    return res.status(500).json({
      success: false,
      message: 'Cannot delete the question in database',
      errors: 'Question error',
    });
  });
}