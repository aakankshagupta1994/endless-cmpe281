import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from '@aws-amplify/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
loggedInUser : any;
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

  async getLoggedInUser(mealPlanId: string) {
    this.loggedInUser = await API.get('endlessapi', '/user/aakanksha.gupta@sjsu.edu', {}).then(resp => {
      return resp;
    }).catch(err => {
      console.log(err);
    });
    return this.loggedInUser;
  }

  async UpdateMealPlanForUser(mealPlanId: string) {
    let body = {
      'username' : 'aakanksha.gupta@sjsu.edu', 
      'userId' : 'aakanksha.gupta@sjsu.edu', 
      'plans' : {
        "mealtype" : mealPlanId, 
        "active" : true, 
        "subscribedOn" : new Date().toDateString()
      }

      
    }
    this.loggedInUser = await API.put('endlessapi', '/user', body).then(resp => {
      return resp;
    }).catch(err => {
      console.log(err);
    });
    return this.loggedInUser;
  }
}
