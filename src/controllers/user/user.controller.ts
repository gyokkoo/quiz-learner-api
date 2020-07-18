import express from 'express';

import { ControllerBase } from '../../interfaces/ControllerBase.interface';
import { loginUser } from './api/user.login';
import { registerUser } from './api/user.register';
import { getUserById } from './api/user.get';

export class UserController implements ControllerBase {
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post('/login', loginUser);
    this.router.post('/register', registerUser);
    this.router.get('/getUserById/:id', getUserById);
  }
}
