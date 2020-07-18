import { verify, VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction, request } from 'express';

const secretKey: string = 'c9ffcf6087a';

interface UserInfo {
  userId: string;
  username: string;
}

/**
 * Authorization middleware function
 * Check whether the request has authorization header
 *
 * Used by express Router
 *
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
