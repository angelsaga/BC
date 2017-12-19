import { Component, HostListener } from '@angular/core';
import {
  TdBounceAnimation,
  TdFlashAnimation,
  TdHeadshakeAnimation,
  TdJelloAnimation,
  TdPulseAnimation,
} from '@covalent/core'
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

import {FormControl, Validators} from '@angular/forms';
import { JwtHelper } from "angular2-jwt";
import { UserInfoService } from "../providers/UserInfoService";
import { Storage } from "@ionic/storage";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    TdBounceAnimation()
  ]
})



export class AppComponent {
  bounceState: boolean = false;
  isAnimate: boolean = false;
  show: boolean = false;
  show_login: boolean = false;
  show_sub: boolean = false;
  phone = '';
  credid = '';
  passwd = '';
  is_login = '';
  photo_list = [];
  total = 0;
  total_rate = 0;
  total_all = 10000000000;
  interval = 10000;

  FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  

  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(event: Event): void {
    this.setAnimate();
  }

  constructor(    
    private userInfoService: UserInfoService,
    private storage: Storage,
    private jwtHelper: JwtHelper,
  ){
    this.getTotalCoinWithoutToken();
    IntervalObservable
      .create(this.interval)
      .subscribe(() => {
        this.getTotalCoinWithoutToken();
      });

    this.photo_list = [{
      photo_url : "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3101860224,2352777645&fm=173&s=C23014C7000912EE141CBDA403007013&w=218&h=146&img.JPEG",
      photo_des : "Description Description Description Description Description Description Description Description"
    },{
      photo_url : "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3101860224,2352777645&fm=173&s=C23014C7000912EE141CBDA403007013&w=218&h=146&img.JPEG",
      photo_des : "Description Description Description Description"
    },{
      photo_url : "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3101860224,2352777645&fm=173&s=C23014C7000912EE141CBDA403007013&w=218&h=146&img.JPEG",
      photo_des : "Description Description Description Description Description Description Description Description"
    },{
      photo_url : "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3101860224,2352777645&fm=173&s=C23014C7000912EE141CBDA403007013&w=218&h=146&img.JPEG",
      photo_des : "Description Description Description Description Description Description Description Description"
    },{
      photo_url : "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3101860224,2352777645&fm=173&s=C23014C7000912EE141CBDA403007013&w=218&h=146&img.JPEG",
      photo_des : "Description Description Description Description"
    },{
      photo_url : "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3101860224,2352777645&fm=173&s=C23014C7000912EE141CBDA403007013&w=218&h=146&img.JPEG",
      photo_des : "Description Description Description Description Description Description Description Description"
    },]
  }

  ngOnInit() {
    this.storage.get('token').then(token => {
      this.userInfoService.authSuccess(token).then((data) => {
        if(typeof(data) == 'string'){
          this.is_login = data;
        }        
      })
    });
    

  }

  showSignUp(e){
    this.show = ! this.show;
    this.isAnimate = ! this.isAnimate;

  }

  SignUp(){    
    this.show = ! this.show;    
  }

  setAnimate(isshow?){
    if(window.pageYOffset > 20){
      this.isAnimate = true;
    }else{
      if( ! this.show){
        this.isAnimate = false;
      }      
    }
    if(isshow){
      this.show = ! this.show;
    }
    
  }

  isLogin(e){
    this.is_login = e;
    this.setAnimate(1);
    this.show_sub = true;
  }

  logout(){
    this.userInfoService.logout();
    this.is_login = '';
    this.show_sub = false;
  }

  showSubscribe(){
    this.show_sub =! this.show_sub;
  }

  getTotalCoinWithoutToken(){
    this.userInfoService.getTotalCoinWithoutToken().then((result) =>
    {
      if('total' in result){
        this.total = result['total'];
        this.total_rate = this.total / this.total_all * 100;
      }
      
    })
  }


}
