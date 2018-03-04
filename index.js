const app = require('express')()
const env = process.env.NODE_ENV || 'development'

let settings = require('./server/config/settings')[env];

require('./server/config/database')(settings)
require('./server/config/express')(app)
require('./server/config/routes')(app)

app.listen(settings.port, () => console.log(`Node.js server running on port ${settings.port}...`))
