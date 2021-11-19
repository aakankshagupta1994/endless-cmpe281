// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(httpClient: HttpClient) { }

  async getRecipes() {
    var recipes;
    API.get('endlessapi', '/recipes', {}).then(resp => {
      recipes = resp;
      console.log(resp);
    }).catch(err => {
      console.log(err);
    });

    return recipes;
  }




  async createRecipe(body: object) {

    API.post('endlessapi', '/recipe', body).then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err);
    });

  }



}
