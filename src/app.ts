import express from 'express';
import { Application } from 'express';
import cookieParser from 'cookie-parser';
import { initialize } from 'passport';
import cors from 'cors';
import logger from 'morgan';
import { urlencoded, json } from 'body-parser';

export class App {
  public app: Application;
  private port: number;

  constructor(appInit: { middleWares: any; controllers: any }) {
    this.app = express();
    const env = process.env.NODE_ENV || 'development';
    const settings = require('./config/settings')[env];
    this.port = settings.port;

    this.configureMondoDb(settings);
    this.configureExpressApp();
    this.configureAuthenticationStrategy();
    this.addAssets();
    
    this.configureRoutes(appInit.controllers);
    this.configureMiddlewares(appInit.middleWares);
    
  }

  private configureMondoDb(settings: any) {
    require('./config/database').default(settings);
  }

  private configureExpressApp() {
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(
      urlencoded({
        extended: false,
      })
    );
    this.app.use(json());
    this.app.use(initialize());
    this.app.use(logger('dev'));
  }

  private configureAuthenticationStrategy() {
    require('./config/passport').default();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Node.js server running on port ${this.port}`);
    });
  }

  private configureMiddlewares(middleWares: any[]) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private configureRoutes(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private addAssets() {
    this.app.use(express.static('public'));
  }
}
