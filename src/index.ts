import express from 'express';

const env = process.env.NODE_ENV || 'development';

// Setup MongoDB connection
const settings = require('./config/settings')[env];
require('./config/database').default(settings);

// Setup express
const app = express();
require('./config/express').default(app);
require('./config/passport').default();

app.listen(settings.port, () => {
  console.log(`Node.js server running on port ${settings.port}...`);
});
