import { Response, Request, NextFunction } from 'express';
import { authenticate } from 'passport';

export function registerUser(req: Request, res: Response, next: NextFunction) {
  const validationResult = validateRegisterData(req.body);
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    });
  }

  return authenticate('local-signup', (err) => {
    if (err) {
      console.log(err),
        res.status(200).json({
          success: false,
          message: err,
        });
    }

    return res.status(200).json({
      success: true,
      message:
        'You have successfully signed up!' +
        'Now you should be able to log in.',
    });
  })(req, res, next);
}

function validateRegisterData(data: any) {
  const errors: any = {};
  let isValid = true;
  let message = '';
  if (
    !data ||
    typeof data.password !== 'string' ||
    data.password.trim().length < 4
  ) {
    isValid = false;
    errors.password = 'Password must have at least 4 characters.';
  }

  if (
    !data ||
    typeof data.firstName !== 'string' ||
    data.firstName.trim().length === 0
  ) {
    isValid = false;
    errors.name = 'Please provide your name.';
  }

  if (
    !data ||
    typeof data.lastName !== 'string' ||
    data.lastName.trim().length === 0
  ) {
    isValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!isValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isValid,
    message,
    errors,
  };
}
