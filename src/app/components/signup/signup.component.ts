import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { slideInOutAnimation } from '../../../animations/index';
import { FormBuilder, Validators } from '@angular/forms';

import { UserInfoService } from "../../../providers/UserInfoService";
import { emailValidator } from '../../../providers/validator'
import { Storage } from "@ionic/storage";
import { ToastService } from "../../../providers/ToastService";
import { TdLoadingService } from '@covalent/core';
import { JwtHelper } from "angular2-jwt";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [UserInfoService],
  // make fade in animation available to this component
  //animations: [slideInOutAnimation],
  
  // attach the fade in animation to the host (root) element of this component
  //host: { '[@slideInOutAnimation]': '' }
})
export class SignupComponent implements OnInit {
  loginForm;
  loginedUser;
  username;
  password;
  verifycode;
  loading = false;
  signing = false;
  islogin;
  resetmode: boolean = false;
  placeholder_passwd = "PASSWORD";

  @Output() closeevent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private userInfoService: UserInfoService,
    private  toastService: ToastService,
    private storage: Storage,
    private _loadingService: TdLoadingService
  ) { 
    this.loginForm = this.formBuilder.group({
      'username': [this.loginedUser, [Validators.required, Validators.minLength(4), emailValidator]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'verifycode': ['', [Validators.required]]
    });
    
    storage.get('username').then(username => {
      if(username){
        this.username = username;
        this.loginForm = this.formBuilder.group({
          'username': [username, [Validators.required, Validators.minLength(4), emailValidator]],
          'password': ['', [Validators.required, Validators.minLength(8)]],
          'verifycode': ['', [Validators.required]]
        })
      }
    });
  }

  ngOnInit() {    
  }

  login(user) {
    this.loading = true;
    this.userInfoService.login(user).then((username) =>{
      this.loading = false;
      this.close(username);
    });
  }

  signup(user) {
    this.signing = true;
    this.userInfoService.signup(user).then((username) =>{
      this.signing = false;
      this.close(username);
    });
  }  

  sendcode(user) {
    this.signing = true;
    this.userInfoService.reset(user).then((d) =>{
      this.signing = false;
    });
  }


  close(data){    
    if(typeof(data) == 'string'){
      this.closeevent.emit(data);
    }    
  }

  onPasswordFocus(){
    this.placeholder_passwd = this.placeholder_passwd 
            + "(at leaset 8 charactors)";
  }

  onPasswordblur(){
    this.placeholder_passwd = this.resetmode 
    ? "NEW PASSWORD"   : "PASSWORD";
  }

  isRestMode(){
    this.resetmode = ! this.resetmode;
    this.placeholder_passwd = this.resetmode 
      ? "NEW PASSWORD"   : "PASSWORD";
  }


}
