import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CreateRecipeRequest } from 'src/app/interfaces/recipe';
import { ingredient } from 'src/app/interfaces/ingredient';


@Component({
  selector: 'recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private recipeService:RecipeService, private http:HttpClient) { }
  // recipe?:CreateRecipeRequest;

  images = ['https://cdn.shopify.com/s/files/1/1517/2462/articles/VeganmealPrep_1512x.jpg', 'https://forgetsugarfriday.com/wp-content/uploads/2019/05/keto-diet-meal-plan-featured.png?resize=980:*', 'https://cdn.shopify.com/s/files/1/1517/2462/articles/VeganmealPrep_1512x.jpg'];
  // selectedImage = this.images.random();
  item = this.images[Math.floor(Math.random() * this.images.length)];
  
  // singleRecipe?:CreateRecipeRequest;

  //mocking the recipeid which we will get when redirecting to this page
  recipeid : string ='';
  recipeName: string = '';
  type: string = '';
  // // type: this.type,
  procedure: any;
  ingredients?: ingredient[];
  
     async ngOnInit(){
     let recipe:CreateRecipeRequest;
    
      //  recipe = await this.recipeService.getRecipe(this.recipeid);

      //  this.recipeName = recipe.recipeName;
      //  this.type = recipe.type;
      //  this.procedure = recipe.procedure;
      //  this.ingredients = recipe.ingredients;


      this.activatedRoute.paramMap.subscribe(async (params)=>{
        console.log("Printing the id we get from recipe list page");
        console.log(this.activatedRoute.snapshot.params);

        var arg = (Object)(this.activatedRoute.snapshot.params).id;
        // debugger;
        this.recipeid = arg;
        var response =   await this.recipeService.getRecipe(this.recipeid);
          
        recipe = response[0];
        this.recipeName = recipe.recipeName;
        this.type = recipe.type;
        this.procedure = recipe.procedure;
        this.ingredients = recipe.ingredients;
        
 
      });  


  }

}