import { Request, Response, NextFunction } from 'express';
import { authenticate } from 'passport';

export function loginUser(req: Request, res: Response, next: NextFunction) {
  console.log("Validaint user!");
  const validationResult = validateLoginData(req.body);
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    });
  }

  return authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(200).json({
          success: false,
          message: err.message,
        });
      }

      return res.status(200).json({
        success: false,
        message: err,
      });
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData,
    });
  })(req, res, next);
}

function validateLoginData(data: any) {
  const errors: any = {};
  let isFormValid = true;
  let message = '';

  if (
    !data ||
    typeof data.username !== 'string' ||
    data.username.trim().length === 0
  ) {
    isFormValid = false;
    errors.username = 'Please provide your username.';
  }

  if (
    !data ||
    typeof data.password !== 'string' ||
    data.password.trim().length === 0
  ) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
}
