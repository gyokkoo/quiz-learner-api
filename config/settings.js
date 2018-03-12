const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../../'))
let port = process.env.PORT || 8080

module.exports = {
  development: {
    rootPath: rootPath,
   // db: 'mongodb://localhost:27017/quiz-learner',
    db: 'mongodb://gyoko:GFnZoiH6W7bD@ds149138.mlab.com:49138/net-shop',
    port: port
  },
  staging: {
  },
  production: {
    port: process.env.PORT
  }
}
