const mongoose = require('mongoose')

mongoose.Promise = global.Promise

module.exports = (settings) => {
  mongoose.connect(settings.db)

  let db = mongoose.connection

  db.once('open', (err) => {
    if (err) {
      throw err
    }

    console.log('MongoDb is ready!')
  })

  db.on('error', err => console.log(`Database error: ${error}`))
}