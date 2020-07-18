import express from 'express';

import { ControllerBase } from '../../interfaces/ControllerBase.interface';
import { getAllQuizzes } from './api/quiz.get-all';

export class QuizController implements ControllerBase {
  //  TODO: Migrate all quiz routes in this controller.
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get('/getAll', getAllQuizzes);
  }
}
