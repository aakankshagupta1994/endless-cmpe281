import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CreateRecipeRequest } from 'src/app/interfaces/recipe';


@Component({
  selector: 'recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private recipeService:RecipeService, private http:HttpClient) { }

  recipe?:CreateRecipeRequest;
  // singleRecipe?:CreateRecipeRequest;
  recipeName: string = '';
  type: string = '';
  // type: this.type,
  procedure: string = ''
  ingridients: string=''
  
     ngOnInit(): void{

      // we need the working recipeId API to get a single recipe by Id
      this.http.get<any>('https://r76zppz36k.execute-api.us-west-2.amazonaws.com/dev/recipe/id').subscribe((res) => {
      
    console.log("response : "+res);
      this.recipe= res.products;
      console.log(this.recipe);

      this.recipeName  = res.products.recipeName;
      this.type  = res.products.type;
      
      // to get the procedure out of the response recipe

      // 
  

    });


      // this.activatedRoute.paramMap.subscribe(async (params)=>{
        
      //   var response =   await this.recipeService.getRecipes();
          
      //   this.recipes = response.products;

      // });
   

    

      


  }

}
