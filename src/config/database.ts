import { connect, connection } from 'mongoose';
import { seedAdminUser } from '../models/User';

export default (settings: any) => {
  connect(settings.db);
  console.log(`Trying to connect to ${settings.db}`);

  const db = connection;

  db.once('open', (err: any) => {
    if (err) {
      throw err;
    }

    seedAdminUser();
    console.log('MongoDb is ready!');
  });

  db.on('error', (err: any) => {
    console.log(`Database error: ${err}`);
  });
};
