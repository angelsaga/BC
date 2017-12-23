import { Component, HostListener } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { JwtHelper } from "angular2-jwt";
import { UserInfoService } from "../providers/UserInfoService";
import { Storage } from "@ionic/storage";

import { TdCollapseAnimation, TdRotateAnimation } from '@covalent/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    TdCollapseAnimation(), 
    TdRotateAnimation(),
    TdCollapseAnimation({ anchor: 'tdCollapseLong', duration: 750}), 
  ],
})



export class AppComponent {
  bounceState: boolean = false;
  isAnimate: boolean = false;
  show: boolean = false;
  show_login: boolean = false;
  show_sub: boolean = false;
  menu_on_md: boolean = false;
  open_menu: boolean = true;
  is_login = '';
 


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

  showMenuonMD(){
    this.menu_on_md = ! this.menu_on_md;
    if(this.menu_on_md){
      this.open_menu = false;
    }else{
      this.open_menu = true;
    }
  }

  


}
