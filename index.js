const express = require('express')
const env = process.env.NODE_ENV || 'development'

// Setup MongoDB connection
let settings = require('./server/config/settings')[env]
require('./server/config/database')(settings)

let app = express()
require('./server/config/express')(app)

// Import server-routes
require('./server/config/routes')(app)

// Setup MongoDB connection
require('./server/config/passport')()

app.listen(settings.port, () => console.log(`Node.js server running on port ${settings.port}...`))
