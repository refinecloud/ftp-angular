import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  public checkoutForm;

  constructor(
    private formBuilder:FormBuilder,
    private router: Router,
    private userService:UserService,
    private toasterService:ToasterService
  ) { 
    
    this.checkoutForm = this.formBuilder.group({
      username: '',
      password: ''
    });

  }

  ngOnInit() {
  }

  onSubmit(customerData) {
    // Process checkout data here

    this.userService.Login(customerData.username,customerData.password).subscribe(
      result =>
      {
        if(result.success)
        { 
          
          sessionStorage.setItem("jwt", result.jwt);

          this.router.navigate(["dashboard"]).then( (e) => {
            if (e) {
              console.log("导航到仪表盘成功!");
            } else {
              console.log("导航到仪表盘失败!");
            }
          });  
        }else
        { 
          this.toasterService.errorsmsg("账号或密码错误");
        }        
        console.warn('Your order has been submitted', result);
      }
    );

    
    

    this.checkoutForm.reset();
  }
  
}
