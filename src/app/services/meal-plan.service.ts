import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';
import { Mealplan } from '../interfaces/mealplan';
@Injectable({
  providedIn: 'root'
})
export class MealPlanService {

  constructor(httpClient:HttpClient) { }
  async getMealPlan(mealPlanId:string){
    API.get('endlessapi','/mealplan',{}).then(resp=>{
      console.log(resp);
    }).catch(err=>{
      console.log(err);
    });
    let mealPlan:Mealplan={
      name:'Vegan Plan',
      duration:28,
      description:'',
      suggestedBy:'',
      mealPlanType:'',
      mealPlanId:mealPlanId
    };
    return mealPlan;
  }
}
