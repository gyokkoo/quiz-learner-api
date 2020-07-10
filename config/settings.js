const path = require('path');

const rootPath = path.normalize(path.join(__dirname, '/../../'));
const port = process.env.PORT || 8080;

module.exports = {
  development: {
    rootPath: rootPath,
    // Used only for development
    db: 'mongodb://admin:admin123@ds111425.mlab.com:11425/quiz-learner-dev',
    port: port,
  },
  production: {
    port: process.env.PORT,
    // Used only for development
    db: 'mongodb://admin:admin123@ds111425.mlab.com:11425/quiz-learner-dev',
  },
  staging: {
  },
};
