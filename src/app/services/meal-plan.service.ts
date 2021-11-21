import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';
import { Mealplan } from '../interfaces/mealplan';
@Injectable({
  providedIn: 'root'
})
export class MealPlanService {

  mealPlanList?: Mealplan[];
  constructor(httpClient:HttpClient) { }
  async getMealPlan(mealplanid:string){
    API.get('endlessapi','/mealplan',{}).then(resp=>{
      console.log(resp);
    }).catch(err=>{
      console.log(err);
    });
    let mealPlan:Mealplan={
      name:'Vegan Plan',
      duration:7,
      description:'',
      suggestedBy:'',
      mealplantype:'',
      mealplanid:mealplanid
    };
    return mealPlan;
  }
  
  async getList() {

    this.mealPlanList = await API.get('endlessapi', '/mealplan/all', {}).then(resp => {
      return resp;
    }).catch(err => {
      console.log(err);
    });
    console.log(this.mealPlanList);
    return this.mealPlanList;
  }

  async createMealPlan(body:object){
    
    API.post('endlessapi','/mealplan', body).then(resp=>{
      console.log(resp);
    }).catch(err=>{
      console.log(err);
    });
}
}
