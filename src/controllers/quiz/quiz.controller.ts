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
  public router = express.Router();
  public base: string = '/quiz';

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get(`${this.base}/getAll`, getAllQuizzes);
    this.router.get(`${this.base}/getQuizById/:id`, getQuizById);
    this.router.get(`${this.base}/getMostRecent`, getMostRecent);
    this.router.post(`${this.base}/create`, authCheck, createQuiz);
    this.router.post(`${this.base}/addSolvedQuiz`, authCheck, addSolvedQuiz);
    this.router.delete(`${this.base}/deleteQuiz/:id`, authCheck, deleteQuiz);
  }
}
