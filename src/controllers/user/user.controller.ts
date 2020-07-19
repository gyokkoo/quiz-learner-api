import express from 'express';

import { ControllerBase } from '../../interfaces/ControllerBase.interface';
import { loginUser } from './api/user.login';
import { registerUser } from './api/user.register';
import { getUserById } from './api/user.get';

export class UserController implements ControllerBase {
  public router = express.Router();
  public base: string = '/auth';

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post(`${this.base}/login`, loginUser);
    this.router.post(`${this.base}/register`, registerUser);
    this.router.get(`${this.base}/getUserById/:id`, getUserById);
  }
}
