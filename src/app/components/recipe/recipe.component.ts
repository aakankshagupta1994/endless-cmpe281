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
  images = ['https://cdn.shopify.com/s/files/1/1517/2462/articles/VeganmealPrep_1512x.jpg', 'https://forgetsugarfriday.com/wp-content/uploads/2019/05/keto-diet-meal-plan-featured.png?resize=980:*', 'https://cdn.shopify.com/s/files/1/1517/2462/articles/VeganmealPrep_1512x.jpg'];
  // selectedImage = this.images.random();
  item = this.images[Math.floor(Math.random() * this.images.length)];

  constructor(private activatedRoute:ActivatedRoute,private recipeService:RecipeService, private http:HttpClient) { }

  // both of the below syntax work. declaring interface will strictly bind our recipe structure to the one in interface
  // recipes?:CreateRecipeRequest[];
  recipes?:any;
  
    async ngOnInit(){

   
      this.recipes = await this.recipeService.getRecipes();
      console.log("All Recipes  " + this.recipes);

  //   this.http.get<any>('https://r76zppz36k.execute-api.us-west-2.amazonaws.com/dev/recipes').subscribe((res) => {
      
  //   console.log("response : "+res);
  //     this.recipes = res.products;
  //     console.log(this.recipes);
  //   });

  }


  

}