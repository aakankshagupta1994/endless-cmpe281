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
    // debugger;
    this.recipe = await API.get('endlessapi', '/recipe/' + recipeId, {}).then(resp => {
      console.log(resp);
      // debugger;
      return resp;
    }).catch(err => {
      console.log(err);
    });
   return this.recipe;
  }


  async createRecipe(body: object) {
    let myInit = {
      body: body, // replace this with attributes you need
      headers: {}, // OPTIONAL
    };
    API.post('endlessapi', '/recipe', myInit).then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err);
    });

  }



}