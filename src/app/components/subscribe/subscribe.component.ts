import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { subscribeValidator } from '../../../providers/validator';
import { UserInfoService } from "../../../providers/UserInfoService";
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  subscribeForm;
  subscribe:number;
  my_coin:number = 0 ;
  total:number = 0;
  submiting : boolean = false;

  alive = true;
  interval = 10000;
  @Input() is_show: boolean;
  @Input() is_login; 
  constructor(
    private formBuilder : FormBuilder,
    private userInfoService: UserInfoService,
  ) { 
    this.subscribeForm = this.formBuilder.group({
      'subscribe': [this.subscribe, [subscribeValidator]]
    });
  }

  ngOnInit() {
    this.getUserCoin();
    this.getTotalCoin(1);
    IntervalObservable
      .create(this.interval)
      .subscribe(() => {
        this.getTotalCoin();
      });
  }


  getUserCoin(){
    return this.userInfoService.getUserCoin().then((data) =>{
      if(0 in data && 'my_coin' in data[0]){
        this.my_coin = data[0]['my_coin'];
      }        
    })
  }

  submit(){
    this.submiting = true;
    let data = {
      my_coin : this.subscribe
    };
    this.userInfoService.updateUserCoin(data).then((result) =>
      {
        this.getUserCoin();
        this.getTotalCoin(1);
        this.subscribe = null;
        this.subscribeForm.reset();
        this.submiting = false;
      }
    )

  }


  getTotalCoin(is_init?){
    if((this.is_show || is_init) && this.is_login){
      this.userInfoService.getTotalCoin().then((result) =>
      {
        if('total' in result){
          this.total = result['total'];
        }
        
      })
    }
  }

}
