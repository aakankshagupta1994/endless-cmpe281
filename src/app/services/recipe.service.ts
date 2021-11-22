// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: any;
  recipe: any;

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
    debugger;
    this.recipe = await API.get('endlessapi', '/recipe/iy5XX' , {}).then(resp => {
      console.log(resp);
      debugger;
      return resp;
    }).catch(err => {
      console.log(err);
    });
   return this.recipe;
  }


  async createRecipe(body: object) {

    API.post('endlessapi', '/recipe', body).then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err);
    });

  }



}