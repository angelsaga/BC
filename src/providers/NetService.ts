import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { JwtHelper } from "angular2-jwt";
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/map';
import { AppConfig } from '../../back/src/config/config';

export interface Activity {
  title: String;
  description: String;
  thumbnail_pic: String[];
  author: String;
}

@Injectable()
export class NetService {  

  // We need to set the content type for the server
  contentHeader = new Headers({ "Content-Type": "application/json" });
  error: string;
  jwtHelper = new JwtHelper();
  public user: string;
  public loading;

  constructor(private http: Http,
    private storage: Storage,
  ) {
  }


  http_get_with_token(url: string, option?: any) {
    var promise = new Promise((resolve, reject) => {
      this.getauthHeader()
        .then(
        (token) => {
          if(token){
            //Set get params
            let params: URLSearchParams = new URLSearchParams();
            for (var key in option) {
              params.set(key, option[key])
            }
            //Set auth token
            var authHeader = this.contentHeader;
            authHeader.set('Authorization', 'Bearer ' + token);

            this.http.get(url, { headers: authHeader, search: params })
              .map(res => res.json())
              .subscribe(
              data => {
                resolve(data);
              },
              err => {
                reject(err);
              }
              );
          }          
        })
        .catch(
        (err) => {
          reject(err);
        }
        )
    })
    return promise;
  }

  http_post_with_token(url: string, option: any) {
    var promise = new Promise((resolve, reject) => {
      this.getauthHeader()
        .then(
        (token) => {
          if(token){
            //Set auth token
            var authHeader = this.contentHeader;
            authHeader.set('Authorization', 'Bearer ' + token);

            this.http.post(url, JSON.stringify(option), { headers: authHeader })
              .map(res => res.json())
              .subscribe(
              data => {
                resolve(data);
              },
              err => {
                reject(err);
              }
              );
          }         
        })
        .catch(
        (err) => {
          reject(err);
        }
        )
    })
    return promise;
  }


  getauthHeader() {
    return this.storage.get('token');
  }



}