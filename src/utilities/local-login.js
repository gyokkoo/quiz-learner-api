import { sign } from 'jsonwebtoken';
const User = require('mongoose').model('User');
import { Strategy as PassportLocalStrategy } from 'passport-local';

const secretKey = 'c9ffcf6087a';

export default new PassportLocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
  },
  (req, inputUsername, password, done) => {
    User.findOne({ username: inputUsername })
      .then((user) => {
        if (!user || !user.authenticate(password)) {
          return done('Incorect username or password');
        }

        const payload = {
          userId: user._id,
          username: user.username,
        };

        const token = sign(payload, secretKey);
        const data = {
          name: user.username,
          id: user._id,
        };

        console.log('User data:');
        console.log(data);

        return done(null, token, data);
      })
      .catch((err) => {
        return done(err);
      });
  }
);
