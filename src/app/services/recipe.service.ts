// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  receipeList : any;
  constructor(httpClient: HttpClient) { }

  async getRecipe(recipeId : string) {
    var recipes;
    return await API.get('endlessapi', '/recipe/' + recipeId, {}).then(resp => {
      // recipes = resp;
      return resp;
      console.log(resp);
    }).catch(err => {
      console.log(err);
    });
debugger;
    return recipes;
  }

  async getRecipeList() {
   debugger;
    this.receipeList = await API.get('endlessapi', '/recipe/all', {}).then(resp => {
      // return resp;
    }).catch(err => {
      console.log(err);
    });
    debugger;
    console.log(this.receipeList);

    return this.receipeList;
  }


  async createRecipe(body: object) {

    API.post('endlessapi', '/recipe', body).then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err);
    });

  }



}
