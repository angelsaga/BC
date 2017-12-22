import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {
  photo_list = [];
  
  constructor() { 
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

  ngOnInit() {
  }

}
