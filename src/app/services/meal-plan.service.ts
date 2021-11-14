import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mealplan } from '../interfaces/mealplan';
@Injectable({
  providedIn: 'root'
})
export class MealPlanService {

  constructor(httpClient:HttpClient) { }
  async getMealPlan(mealPlanId:string){
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
