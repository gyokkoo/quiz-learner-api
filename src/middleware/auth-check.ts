import { verify, VerifyErrors } from 'jsonwebtoken';
<<<<<<< HEAD
import { Request, Response, NextFunction } from 'express';
=======
import { Request, Response, NextFunction, request } from 'express';
>>>>>>> typescript-integration

const secretKey: string = 'c9ffcf6087a';

interface UserInfo {
  userId: string;
  username: string;
}

/**
<<<<<<< HEAD
 * Authorization middleware
 * Check whether the request has authorization header
 
=======
 * Authorization middleware function
 * Check whether the request has authorization header
 *
 * Used by express Router
 *
>>>>>>> typescript-integration
 * return 401 if authorization header is not provided
 * return 403 if verification fail
 */
export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string | undefined = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).end();
  }

  // Get the last part from a authorization header
  // string like "bearer token-value".
  const token: string = authHeader.split(' ')[1];

  // Asynchronously verify given token using a secret to get a decoded token.
  return verify(
    token,
    secretKey,
    (err: VerifyErrors | null, decoded: object | undefined) => {
      console.log('Verifying in auth-check.ts middleware');
      if (err) {
        // 401 code is for unauthorized status.
        return res.status(403).end();
      }

      const user: UserInfo = decoded as UserInfo;
      res.locals.userId = user.userId;
      res.locals.username = (decoded as UserInfo).username;

      // Pass the execution off to whatever request the client intended.
      return next();
    }
  );
};
