import express from 'express';

import { ControllerBase } from '../../interfaces/ControllerBase.interface';
import { createQuestion } from './api/question.create';
import { getQuestion } from './api/question.get';
import authCheck from '../../middleware/auth-check';
import { editQuestion } from './api/question.edit';
import { deleteQuestion } from './api/question.delete';

export class QuestionController implements ControllerBase {
  public router = express.Router();
  public base = '/quiz';

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get(`${this.base}/getQuestions/:id`, getQuestion);
    this.router.post(`${this.base}/createQuestion`, authCheck, createQuestion);
    this.router.post(`${this.base}/addQuestion`, authCheck, createQuestion);
    this.router.put(`${this.base}/editQuestion/:id`, authCheck, editQuestion);
    this.router.delete(`${this.base}/deleteQuestion/:id`, authCheck, deleteQuestion);
  }
}
