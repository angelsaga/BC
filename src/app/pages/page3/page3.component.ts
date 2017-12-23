import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss']
})
export class Page3Component implements OnInit {
  photo_list = [];
  constructor() { }

  ngOnInit() {
    this.photo_list = [{
      photo_url : "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3101860224,2352777645&fm=173&s=C23014C7000912EE141CBDA403007013&w=218&h=146&img.JPEG",
      photo_des : "Description Description Description Description"
    },{
      photo_url : "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3101860224,2352777645&fm=173&s=C23014C7000912EE141CBDA403007013&w=218&h=146&img.JPEG",
      photo_des : "Description Description Description Description"
    },{
      photo_url : "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3101860224,2352777645&fm=173&s=C23014C7000912EE141CBDA403007013&w=218&h=146&img.JPEG",
      photo_des : "Description Description Description Description"
    },{
      photo_url : "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3101860224,2352777645&fm=173&s=C23014C7000912EE141CBDA403007013&w=218&h=146&img.JPEG",
      photo_des : "Description Description Description Description"
    },{
      photo_url : "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3101860224,2352777645&fm=173&s=C23014C7000912EE141CBDA403007013&w=218&h=146&img.JPEG",
      photo_des : "Description Description Description Description"
    },{
      photo_url : "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3101860224,2352777645&fm=173&s=C23014C7000912EE141CBDA403007013&w=218&h=146&img.JPEG",
      photo_des : "Description Description Description Description"
    },]
  }

}
