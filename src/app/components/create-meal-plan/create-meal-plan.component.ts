import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CreateRecipeRequest } from 'src/app/interfaces/recipe';
import { MealPlanService} from 'src/app/services/meal-plan.service';
import {CreateMealplanRequest, Mealplan} from 'src/app/interfaces/mealplan'




@Component({
  selector: 'app-create-meal-plan',
  templateUrl: './create-meal-plan.component.html',
  styleUrls: ['./create-meal-plan.component.css'],
  
})
export class CreateMealPlanComponent implements OnInit {

  selectedValue: string='';

  public name ='';
  public type='';
  public description='';
    suggestedBy='';
    mealPlanType='';
    duration=1;

  constructor( recipeService:RecipeService, private http:HttpClient,private MealPlanService:MealPlanService ) { 
  }
  recipes?:CreateRecipeRequest[];
  

  ngOnInit(): void {
    
    this.http.get<any>('https://r76zppz36k.execute-api.us-west-2.amazonaws.com/dev/recipes').subscribe((res) => {
      
      console.log("response : "+res);
        this.recipes = res.products;
        console.log(this.recipes);

      });
  //  this.mealPlanList =  this.MealPlanService.getList();

  }
  
  public mealtypes: any[] = [{
    id: 1,
    breakfast: '',
    lunch: '',
    dinner: ''
  }];
  addDay() {
    this.mealtypes.push({
      id: this.mealtypes.length + 1,
      breakfast: '',
    lunch: '',
    dinner: ''
      
    });
  }

  
  removeDay(i: number) {
    this.mealtypes.splice(i, 1);
  }

  onSubmit(): void {
    let dietitianid = 'd102';
    let duration = 7;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length: number) {
      let result = ' ';
      const charactersLength = characters.length;
      for (let i = length; i > 0; i--) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }

    let mealplan: CreateMealplanRequest = {
      mealplanid:generateString(5),
      suggestedBy: dietitianid,
      name: this.name,
      mealplantype: this.mealPlanType,
      description: this.description,
      duration:duration,
      recipes: this.recipes
    };

    // let body = {"recipeId":(this.recipeName.substr(0,this.recipeName.indexOf(' ')).trim().concat(generateString(5))), "recipeName": this.recipeName,"dietecianId": dietecianId,"type":this.type,"procedure":this.steps , "ingridients":this.ingridients };
    let req = {"body" : mealplan};
    this.MealPlanService.createMealPlan(req);

  }

}
