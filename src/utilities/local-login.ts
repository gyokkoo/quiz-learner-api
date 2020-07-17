import { sign } from 'jsonwebtoken';
<<<<<<< HEAD:src/utilities/local-login.js
const User = require('mongoose').model('User');
import { Strategy as PassportLocalStrategy } from 'passport-local';

const secretKey = 'c9ffcf6087a';
=======
import { Strategy as PassportLocalStrategy } from 'passport-local';
import { Request } from 'express';

const User = require('mongoose').model('User');

const secretKey: string = 'c9ffcf6087a';
>>>>>>> typescript-integration:src/utilities/local-login.ts

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
