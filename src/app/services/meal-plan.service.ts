import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';
import { Mealplan } from '../interfaces/mealplan';
@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  mealplanList: any;

  constructor(httpClient: HttpClient) { }
  async getMealPlan(mealPlanId: string) {
    return API.get('endlessapi', '/mealplan/' + mealPlanId, {}).then(resp => {
      console.log(resp);
      debugger;
      return resp;
    }).catch(err => {
      console.log(err);
    });
    // let mealPlan:Mealplan={
    //   name:'Vegan Plan',
    //   duration:28,
    //   description:'',
    //   suggestedBy:'',
    //   mealPlanType:'',
    //   mealPlanId:mealPlanId
    // };
    // return mealPlan;
  }

  async getList() {

    this.mealplanList = await API.get('endlessapi', '/mealplan/all', {}).then(resp => {
      return resp;
    }).catch(err => {
      console.log(err);
    });
    console.log(this.mealplanList);
    return this.mealplanList;
  }
}
