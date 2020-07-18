import express from 'express';

import { ControllerBase } from '../../interfaces/ControllerBase.interface';
import { createQuestion } from './api/question.create';
import { getQuestion } from './api/question.get';
import authCheck from '../../middleware/auth-check';
import { editQuestion } from './api/question.edit';
import { deleteQuestion } from './api/question.delete';

export class QuestionController implements ControllerBase {
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get('/getQuestions/:id', getQuestion);
    this.router.post('/createQuestion', authCheck, createQuestion);
    this.router.post('/addQuestion', authCheck, createQuestion);
    this.router.put('/editQuestion/:id', authCheck, editQuestion);
    this.router.delete('/deleteQuestion/:id', authCheck, deleteQuestion);
  }
}
