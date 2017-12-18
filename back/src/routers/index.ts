import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import * as jwt from "express-jwt";
import * as bodyParser from "body-parser";
import { User } from '../controllers/user';
import { ActivityRoute } from '../routers/activity';
import { UserRoute } from '../routers/user';
import { PushRoute } from '../routers/push';
import * as config from "../config/config";
let debug = require('debug')('route');
let secret_token = config.secret_token;



export class IndexRoute extends BaseRoute {
  constructor() {
    super();
  }

  public static create(router: Router) {
    router.use(jwt({ secret: secret_token })
      .unless({ path: 
          [
            '/user/register', 
            '/user/login', 
            '/user/sendvcode', 
            '', 
            '/', 
            '/test',
            '/coin/total'
          ] 
        }));

    router.use((err, req, res, next) => {
      if (err) {
        debug(err)
      }
      if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
      }
    });

    router.all('*', (req: Request, res: Response, next: NextFunction) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Credentials', 'true');
      res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
      res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
      if ('OPTIONS' == req.method) return res.sendStatus(200);
      next();
    });

    router.use(bodyParser.json({
      verify: (req, res, buf, encoding) => {
        req['rawBody'] = buf;
      }
    }));
    router.use(bodyParser.urlencoded({
      extended: false,
      verify: (req, res, buf, encoding) => {
        req['rawBody'] = buf;
      }
    }));

    /* GET home page. */
    router.get('/',
      (req: Request, res: Response, next: NextFunction) => {
        res.render('index', { title: 'LW' });
      });


    // Create a new user    
    router.post('/user/register',
      (req: Request, res: Response, next: NextFunction) => {
        new UserRoute().Register(req, res, next);
      });

    // Login
    router.post('/user/login', (req: Request, res: Response, next: NextFunction) => {
      new UserRoute().login(req, res, next);
    });

    // sendVerifyCode
    router.post('/user/sendvcode', (req: Request, res: Response, next: NextFunction) => {
      new UserRoute().sendVerifyCode(req, res, next)
    });

    router.get('/user/info', (req: Request, res: Response, next: NextFunction) => {
      new UserRoute().getUserInfo(req, res, next);
    });

    router.get('/user/coin', (req: Request, res: Response, next: NextFunction) => {
      new UserRoute().getUserCoin(req, res, next);
    });

    router.post('/user/coin', (req: Request, res: Response, next: NextFunction) => {
      new UserRoute().updateUserCoin(req, res, next);
    });

    router.get('/coin/total', (req: Request, res: Response, next: NextFunction) => {
      new UserRoute().getTotalCoin(req, res, next);
    });
  }



}