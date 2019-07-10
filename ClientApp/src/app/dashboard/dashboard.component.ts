import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,private userService:UserService) { }

  ngOnInit() {

    if(this.userService.CheckLogin() == false)
    {
      this.router.navigate(["login"]).then( (e) => {
        if (e) {
          console.log("导航到登录窗口成功!");
        } else {
          console.log("导航到登录窗口失败!"); 
        }
      });  
    }

  }

}
