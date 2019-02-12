import mongoose from 'mongoose';

const User = require('../models/User')

// Mongoose promise is deprecated so use node.js global promise
mongoose.Promise = global.Promise

module.exports = (settings) => {
  mongoose.connect(settings.db)
  console.log(`Trying to connect to ${settings.db}`)

  let db = mongoose.connection

  db.once('open', (err) => {
    if (err) {
      throw err
    }

    User.seedAdminUser()
    console.log('MongoDb is ready!')
  })

  db.on('error', err => console.log(`Database error: ${err}`))
}
