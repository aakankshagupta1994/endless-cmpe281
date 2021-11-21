import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CreateRecipeRequest } from 'src/app/interfaces/recipe';


@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private recipeService:RecipeService, private http:HttpClient) { }

  recipes?:CreateRecipeRequest[];
  
    async ngOnInit(){


      // this.activatedRoute.paramMap.subscribe(async (params)=>{
        
      //   let response =   await this.recipeService.getRecipes();
          
      //   this.recipes = response.products;

      // });
   
      this.recipes = await this.recipeService.getRecipes();
     console.log("All Recipes  " + this.recipes);

    // this.http.get<any>('https://r76zppz36k.execute-api.us-west-2.amazonaws.com/dev/recipes').subscribe((res) => {
      
    // console.log("response : "+res);
    //   this.recipes = res.products;
    //   console.log(this.recipes);
    // });

  }

}