import { urlencoded, json } from 'body-parser';
import { initialize } from 'passport';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// Express configuration
export default (app: any) => {
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

  app.use(express.static('public'));

  console.log('Express is ready!');
};