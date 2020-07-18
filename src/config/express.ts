import { urlencoded, json } from 'body-parser';
import { initialize } from 'passport';
import { QuizController } from '../controllers/quiz/quiz.controller';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// Express configuration
export default (app: any) => {
  app.use(cookieParser());
  app.use(cors());

  app.use(
    urlencoded({
      extended: false,
    })
  );
  app.use(json());
  app.use('/quiz', new QuizController().router);

  app.use(initialize());

  app.use(logger('dev'));

  app.use(express.static('public'));

  console.log('Express is ready!');
};
