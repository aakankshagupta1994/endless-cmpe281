import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(httpClient:HttpClient) { }

     async getRecipes(){
    var recipes;
    API.get('endlessapi','/recipes',{}).then(resp=>{
      recipes= resp;
      console.log(resp);
    }).catch(err=>{
      console.log(err);
    });
    
    return recipes;
  }

}