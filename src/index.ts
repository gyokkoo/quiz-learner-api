import express from 'express';
import userRoutes from './routes/userRoutes';
import quizRoutes from './routes/quizRoutes';

const env = process.env.NODE_ENV || 'development';

// Setup MongoDB connection
const settings = require('./config/settings')[env];
require('./config/database').default(settings);

// Setup express
const app = express();
require('./config/express').default(app);
require('./config/passport').default();

// Import server-routes
// require('./config/routes')(app)
app.use('/auth', userRoutes);
app.use('/quiz', quizRoutes);

app.listen(settings.port, () => {
  console.log(`Node.js server running on port ${settings.port}...`);
});
