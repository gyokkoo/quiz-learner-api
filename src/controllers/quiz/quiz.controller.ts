import express from 'express';

import { ControllerBase } from '../../interfaces/ControllerBase.interface';
import authCheck from '../../middleware/auth-check';
import { getAllQuizzes } from './api/quiz.get-all';
import { createQuiz } from './api/quiz.create';
import { deleteQuiz } from './api/quiz.delete';
import { getQuizById } from './api/quiz.get';
import { getMostRecent } from './api/quiz.get-recent';
import { addSolvedQuiz } from './api/quiz.add-solved';

export class QuizController implements ControllerBase {
  //  TODO: Migrate all quiz routes in this controller.
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get('/getAll', getAllQuizzes);
    this.router.get('/getQuizById/:id', getQuizById);
    this.router.get('/getMostRecent', getMostRecent);
    this.router.post('/create', authCheck, createQuiz);
    this.router.post('/addSolvedQuiz', addSolvedQuiz);
    this.router.delete('/deleteQuiz/:id', authCheck, deleteQuiz);
  }
}
