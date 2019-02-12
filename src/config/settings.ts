import path from 'path';

let rootPath = path.normalize(path.join(__dirname, '/../../'))
let port = process.env.PORT || 8080

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://admin:GFnZoiH6W7bD@ds215759.mlab.com:15759/quiz-learner-db',
    // db: 'mongodb://gyoko:GFnZoiH6W7bD@ds149138.mlab.com:49138/net-shop'
    port: port
  },
  production: {
    port: process.env.PORT,
    db: 'mongodb://admin:GFnZoiH6W7bD@ds215759.mlab.com:15759/quiz-learner-db'
    // db: 'mongodb://gyoko:GFnZoiH6W7bD@ds149138.mlab.com:49138/net-shop'
  },
  staging: {
  }
}
