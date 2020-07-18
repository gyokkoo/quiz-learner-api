import { Request, Response } from 'express';
import { User } from '../../../models/User';
import { SolvedQuiz } from '../../../models//SolvedQuiz';

export function getUserById(req: Request, res: Response): Promise<any> {
  const id: string = req.params.id;

  return User.findById(id)
    .then((user: any) => {
      const userData: any = {
        username: user.username,
        fullName: user.firstName + ' ' + user.lastName,
        roles: user.roles,
        registrationDate: user.dateRegistered,
      };
      SolvedQuiz.find({ solvedBy: id }).then((quizzes) => {
        userData.solvedQuizzes = quizzes;
        res.status(200).json({
          success: true,
          message: `User data loaded!`,
          userData,
        });
      });
    })
    .catch((err: any) => {
      res.status(500);
      res.json({
        success: false,
        message: 'Could not find such user!',
      });
    });
}
