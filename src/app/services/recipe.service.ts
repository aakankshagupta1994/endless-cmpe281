// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: any;

  constructor(httpClient: HttpClient) { }

  async getRecipes() {
    // var recipes;
   this.recipes=  await API.get('endlessapi', '/recipe/all', {}).then(resp => {
    return resp;
      // console.log(resp);
    }).catch(err => {
      console.log(err);
    });

    console.log(this.recipes);
    return this.recipes;
  }

  async getRecipe(recipeId: string) {
    return API.get('endlessapi', '/recipe/' + recipeId, {}).then(resp => {
      console.log(resp);
      // debugger;
      return resp;
    }).catch(err => {
      console.log(err);
    });
   
  }


  async createRecipe(body: object) {

    API.post('endlessapi', '/recipe', body).then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err);
    });

  }



}
