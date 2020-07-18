import { sign } from 'jsonwebtoken';
import { Strategy as PassportLocalStrategy } from 'passport-local';
import { Request } from 'express';

const User = require('mongoose').model('User');

const secretKey: string = 'c9ffcf6087a';

export default new PassportLocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
  },
  (req: Request, inputUsername: string, password: string, done: Function) => {
    User.findOne({ username: inputUsername })
      .then((user: any) => {
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
      .catch((err: any) => {
        return done(err);
      });
  }
);
