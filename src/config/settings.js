import { normalize, join } from 'path';

const rootPath = normalize(join(__dirname, '/../../'));
const port = process.env.PORT || 8080;

export const development = {
  rootPath: rootPath,
  // Used only for development
  db: 'mongodb://admin:admin123@ds111425.mlab.com:11425/quiz-learner-dev',
  port: port,
};
export const production = {
  port: process.env.PORT,
  // Used only for development
  db: 'mongodb://admin:admin123@ds111425.mlab.com:11425/quiz-learner-dev',
};
export const staging = {};
