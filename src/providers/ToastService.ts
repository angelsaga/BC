import { Injectable } from '@angular/core';

@Injectable()
export class ToastService {
  public login_msg;
  constructor() {}

  public showLoginMsg(m: string){
      this.login_msg = m;
  }
}