import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { User } from '../controllers/user';

export class UserRoute extends BaseRoute {
  constructor(
    ) {
    super();
  }

  public Register(req: Request, res: Response, next: NextFunction) {
    new User().register(req, res);
  }

  public login(req: Request, res: Response, next: NextFunction) {
    new User().login(req, res);
  }

  public getUserInfo(req: Request, res: Response, next: NextFunction) {
    new User().getUserInfo(req, res);
  }

  public sendVerifyCode(req: Request, res: Response, next: NextFunction) {
    new User().sendVerifyCode(req, res);
  }

  public getUserCoin(req: Request, res: Response, next: NextFunction) {
    new User().getUserCoin(req, res);
  }

  public updateUserCoin(req: Request, res: Response, next: NextFunction) {
    new User().updateUserCoin(req, res);
  }

  public getTotalCoin(req: Request, res: Response, next: NextFunction) {
    new User().getTotalCoin(req, res);
  }

}