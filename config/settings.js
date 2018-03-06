const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../../'))
let port = process.env.PORT || 8080

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost:27017/quiz-learner',
    port: port
  },
  staging: {
  },
  production: {
    port: process.env.PORT
  }
}
