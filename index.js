const express = require('express')
const env = process.env.NODE_ENV || 'development'

// Setup MongoDB connection
let settings = require('./config/settings')[env]
require('./config/database')(settings)

let app = express()
require('./config/express')(app)

// Import server-routes
require('./config/routes')(app)

// Setup MongoDB connection
require('./config/passport')()

app.listen(settings.port, () => console.log(`Node.js server running on port ${settings.port}...`))
