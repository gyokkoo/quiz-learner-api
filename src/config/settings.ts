import { normalize, join } from 'path';

const rootPath: string = normalize(join(__dirname, '/../../'));
const port: any = process.env.PORT || 8080;

// Note: Connection strings should never be shared. This databse is only for development.
const databaseConnection: string =
  'mongodb://admin:admin123@ds111425.mlab.com:11425/quiz-learner-dev';

// Development configuration
export const development = {
  rootPath: rootPath,
  // Used only for development
  db: databaseConnection,
  port: port,
};

// Production configuration
export const production = {
  port: process.env.PORT,
  db: databaseConnection,
};

// Staging configuration
export const staging = {};
