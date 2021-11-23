import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from '@aws-amplify/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInUser: any;
  constructor(httpClient: HttpClient) { }
  async getUserDetails() {
    if(!this.loggedInUser)
      this.loggedInUser= await API.get('endlessapi', '/user', {});
    
    return this.loggedInUser;
  }

  async getLoggedInUser() {
    this.loggedInUser = await API.get('endlessapi', '/user', {});
    return this.loggedInUser;
  }

  async UpdateMealPlanForUser(mealPlanId: string, user: any) {

    let body = {
      'username' : 'aakanksha.gupta@sjsu.edu', 
      'usertype' : 'User',
      'plans' : [{
        "mealtype" : mealPlanId, 
        "active" : true, 
        "subscribedOn" : new Date().toDateString()
      }]
    }

    if (user) {
      user.plans.map((item: any) => { return item.active = false; });
      user.plans.push(body.plans[0]);
      
      body = user;

    }
    
    let myInit = {
      body: body, // replace this with attributes you need
      headers: {}, // OPTIONAL
    };
    this.loggedInUser = await API.put('endlessapi', '/user', myInit).then(resp => {
      return resp;
    }).catch(err => {
      console.log(err);
    });
    return this.loggedInUser;
  }
}
