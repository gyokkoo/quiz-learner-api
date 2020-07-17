import { Promise, connect, connection } from 'mongoose';
import { seedAdminUser } from '../models/User';

// Mongoose promise is deprecated so use node.js global promise
Promise = global.Promise;

export default (settings) => {
  connect(settings.db);
  console.log(`Trying to connect to ${settings.db}`);

  const db = connection;

  db.once('open', (err) => {
    if (err) {
      throw err;
    }

    seedAdminUser();
    console.log('MongoDb is ready!');
  });

  db.on('error', (err) => {
    console.log(`Database error: ${err}`);
  });
};
