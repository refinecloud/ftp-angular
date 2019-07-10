import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResult } from '../models/LoginResult';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  usUrl:string = 'api/User/Login';
  
  constructor(private http: HttpClient) { }

  Login(username:string,password:string):Observable<LoginResult>
  {
      var loginArgs =  { "username":username,"password":password };

      return this.http.post<LoginResult>(this.usUrl,loginArgs,httpOptions);
  };

  CheckLogin():boolean
  {
    var jwt = sessionStorage.getItem("jwt")
    
    if(!jwt)
    {
      return false;
    }
    else
    { 
      return true;
    }
  }

}
