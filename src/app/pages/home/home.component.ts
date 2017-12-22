import { Component, OnInit } from '@angular/core';
import { UserInfoService } from "../../../providers/UserInfoService";
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  total = 0;
  total_rate = 0;
  total_all = 10000000000;
  interval = 10000;

  constructor(
    private userInfoService: UserInfoService
  ) { 
    this.getTotalCoinWithoutToken();
    IntervalObservable
      .create(this.interval)
      .subscribe(() => {
        this.getTotalCoinWithoutToken();
      });
  }

  ngOnInit() {
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
