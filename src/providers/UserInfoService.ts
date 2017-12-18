import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { JwtHelper } from "angular2-jwt";
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/map';
import { AppConfig } from '../../back/src/config/config';
import { ToastService } from "./ToastService";
import { NetService } from "./NetService";

@Injectable()
export class UserInfoService {
  private rest_api_base_url = AppConfig.getBaseUrl();
  private LOGIN_URL = this.rest_api_base_url + "/user/login";
  private SIGNUP_URL = this.rest_api_base_url + "/user/register";
  private SENDVCODE_URL = this.rest_api_base_url + "/user/sendvcode";
  private COIN_URL = this.rest_api_base_url + "/user/coin";
  private COIN_TOTAL_URL = this.rest_api_base_url + "/coin/total";
  // We need to set the content type for the server
  contentHeader = new Headers({ "Content-Type": "application/json" });
  error: string;
  jwtHelper = new JwtHelper();
  public user: string;
  public is_admin : boolean;

  constructor(private http: Http,
    private storage: Storage,
    private toastService: ToastService,
    private netService: NetService
    ) {
  }  

  login(credentials) {
    return new Promise((resolve, reject) => {
      this.http.post(this.LOGIN_URL, JSON.stringify(credentials), { headers: this.contentHeader })
        .map(res => res.json())
        .subscribe(
        data => {
            this.authSuccess(data.token).then((d) => {
              resolve(d)
            })          
          },
        err => {
          //this.loading.dismiss();
          this.error = err;
          if (err.status == '401') {
            //this.toastService.showLoginMsg('用户或密码错误')
            this.toastService.showLoginMsg('Invalid user or password');
          } else if (err.status == '403') {
            //this.toastService.showToast('验证码错误')
            this.toastService.showLoginMsg('Invalid verification code');
          } else if (err.status == '404') {
            //this.toastService.showToast('验证码失效，请按取消重新找回')
            this.toastService.showLoginMsg('verification code has been expired, please send another one');
          } else {
            //this.toastService.showToast('请检查网络或安全设置')
            this.toastService.showLoginMsg('Network issue');          
          }
          resolve(err);
        }
        );
      })
  }

  signup(credentials) {
    return new Promise((resolve, reject) => {
      this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.contentHeader })
        .map(res => res.json())
        .subscribe(
        data => {
          this.authSuccess(data.token).then((d) => {
            console.log(d);
            resolve(d)
          })
          
          },
        err => {
          this.error = err;
          if (err.status == '500') {
            //this.toastService.showToast('这个邮箱已经注册过了')
            this.toastService.showLoginMsg('This email has been registered');
          } else {
            //this.toastService.showToast('请检查网络或安全设置')
            this.toastService.showLoginMsg('Network issue');
          }
          resolve(err);
        }
        );
      })
  }

  reset(credentials) {
    return new Promise((resolve, reject) => {
      this.http.post(this.SENDVCODE_URL, JSON.stringify(credentials), { headers: this.contentHeader })
        .map(res => res.json())
        .subscribe(
        data => {
          this.toastService.showLoginMsg('A email has been sent to' + credentials.username);
          resolve(data);
          //this.loading.dismiss();
          //this.toastService.showToast('一封邮件已经发送到您的邮箱，请查阅')
        },
        err => {
          this.error = err;
          if (err.status == '500') {
            this.toastService.showLoginMsg('Failed to send email to' + credentials.username);
              //this.toastService.showToast('发送失败')
            } else if (err.status == '402') {
              this.toastService.showLoginMsg('Previous verification code is still available, please check mail box of ' + credentials.username);
              //this.toastService.showToast('前次发送的验证码仍未失效，请查阅邮箱')
            } else {
              this.toastService.showLoginMsg('Network issue');
              //this.toastService.showToast('请检查网络或安全设置')
            }
            resolve(err);
          }
        );
    })
  }

  logout() {
    this.storage.remove('token');
  }

  authSuccess(token) {
    return new Promise((resolve, reject) =>{
      if(token){
        this.storage.set('token', token).then((any) => {
          let token_dec = this.jwtHelper.decodeToken(token);
          this.user = token_dec.username;
          this.is_admin = token_dec.is_admin;
          this.storage.set('username', this.user).then((username) => {
            this.toastService.showLoginMsg('');
            resolve(username);
          });
        });;
      }      
    });

  }

  isAdmin(){
      return this.storage.get('token').then((data) => {
        let token = this.jwtHelper.decodeToken(data);
        return token.is_admin;
      });
  }

  
  getUserCoin() {
    var promise = new Promise((resolve, reject) => {
      this.netService.http_get_with_token(this.COIN_URL, null)
        .then(
        (data) => {
          resolve(data);
        })
        .catch(
        (err) => {
          reject(err);
        }
        )
    })
    return promise;
  }

  updateUserCoin(data) {
    var promise = new Promise((resolve, reject) => {
      this.netService.http_post_with_token(this.COIN_URL, data)
        .then(
        (data) => {
          resolve(data);
        })
        .catch(
        (err) => {
          reject(err);
        }
        )
    })
    return promise;
  }

  getTotalCoin() {
    var promise = new Promise((resolve, reject) => {
      this.netService.http_get_with_token(this.COIN_TOTAL_URL)
        .then(
        (data) => {
          resolve(data);
        })
        .catch(
        (err) => {
          reject(err);
        }
        )
    })
    return promise;
  }

  getTotalCoinWithoutToken() {
    var promise = new Promise((resolve, reject) => {
      this.http.get(this.COIN_TOTAL_URL)
      .map(res => res.json())
      .subscribe(
      data => {
          resolve(data);          
        },
      err => {
        reject(err);
      })
    })
    return promise;
  }



}