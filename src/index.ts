const express = require('express')
const env = process.env.NODE_ENV || 'development'
const userRoutes = require('./routes/userRoutes')
const quizRoutes = require('./routes/quizRoutes')

// Setup MongoDB connection
let settings = require('./config/settings')[env]
require('./config/database')(settings)

// Setup express
let app = express()
require('./config/express')(app)
require('./config/passport')()

// Import server-routes
// require('./config/routes')(app)
app.use('/auth', userRoutes)
app.use('/quiz', quizRoutes)

app.listen(settings.port, () => console.log(`Node.js server running on port ${settings.port}...`))
