import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from '@aws-amplify/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(httpClient:HttpClient) { }
  async getUserDetails(){
    API.get('endlessapi','/user',{}).then((data)=>{
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    });
    return {
      username:'varun',
      role:'admin'
    };
  }
}
