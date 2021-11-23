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
        "subscribedOn" :  ((new Date().getMonth()+1).toString())+ '/'+( new Date().getDate().toString()) +'/' + (new Date().getFullYear().toString())
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
  async upgradeUser(){
    let res= await API.post('endlessapi', '/user/dietitianreq',{
      body: {}, 
      headers: {}, 
    });
    return res;
  }
  async subscribe(mealplanId:string){
    let res= await API.post('endlessapi', '/user/subscribe',{
      body: {
        mealplanId:mealplanId
      }, 
      headers: {}, 
    });
    return res;
  }
  async getDietitianReqs(){
    let res= API.get('endlessapi', '/user/dietitianreqs',{});
    return res;
  }
}
