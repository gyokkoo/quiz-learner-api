import { static } from 'express';
import { urlencoded, json } from 'body-parser';
import { initialize } from 'passport';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

export default (app) => {
  app.use(cookieParser());
  app.use(
    urlencoded({
      extended: false,
    })
  );
  app.use(json());

  app.use(initialize());
  app.use(cors());

  app.use(logger('dev'));

  app.use(static('public'));

  console.log('Express is ready!');
};
