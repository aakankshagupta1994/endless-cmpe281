import { RecipeService } from 'src/app/services/recipe.service';
import { MealPlanService } from './../../services/meal-plan.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mealplan } from 'src/app/interfaces/mealplan';

import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { a } from '@aws-amplify/ui';



@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent {
  mealplandetail?: Mealplan[];
  mealplanname?: string;
  mealplantype?: string;
  mealplandietician?: string;
  mealplandescription?: string; 
  mealplanduration?: number;

  items?: any[];
  meals: any;
  itemsLength : any;
  mealplanid: any;
  expandedIndex = 0;
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         // this block is for handset view
  //         { title: 'Breakfast', cols: 1, rows: 1 ,imageSrc:'assets/img/Breakfast.jpg/', titles:'AvocadoToast'},
  //         { title: 'Lunch', cols: 1, rows: 1,imageSrc:'assets/img/Lunch.jpg/' ,titles:'Whole Wheat Bread'},
  //         { title: 'Dinner', cols: 1, rows: 1 ,imageSrc:'assets/img/Dinner.jpg/',titles:'Peel and mash avocado'}
  //       ];
  //     }

  //     return [
  //       { title: 'Breakfast', cols: 1, rows: 1, imageSrc:'assets/img/Breakfast.jpg/', titles:'Avocado Toast' },
  //       { title: 'Lunch', cols: 1, rows: 1,imageSrc:'assets/img/Lunch.jpg/',titles:'Whole Wheat Bread' },
  //       { title: 'Dinner', cols: 1, rows: 1,imageSrc:'assets/img/Dinner.jpg/',titles:'Peel and mash avocado' }
  //     ];
  //   })
  // );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private mealplanservice: MealPlanService, private recipeservice: RecipeService) {
    this.mealplanid = this.router.url.split('/')[2];
    
    console.log(this.mealplanid);
    this.meals = [];

  }


  async ngOnInit() {

    this.mealplandetail = await this.mealplanservice.getMealPlan(this.mealplanid);
    
    console.log("mealplans component  " + this.mealplandetail);
    if (this.mealplandetail && this.mealplandetail.length === 1)
    {
      this.items = this.mealplandetail[0].chart;
      this.mealplanname = this.mealplandetail[0].name;
      
      this.mealplantype = this.mealplandetail[0].mealplantype;
      this.mealplandietician = this.mealplandetail[0].suggestedBy;
     
      this.mealplandescription = this.mealplandetail[0].description;
      this.mealplanduration = this.mealplandetail[0].duration;

      await this.formatItems(this.items);
      console.log(this.items);
      
    }

   
    
    // return this.items;

    // document.querySelector(".carousel-inner").firstChild.classList.add("active");
  }

  async formatItems(items : any[])
  {
    var that = this;
  
      for (let i in items)
      {
      
        let breakfast = await this.getRecipeDetails(items[i].breakfast);
        let lunch = await this.getRecipeDetails(items[i].lunch);
        let dinner =  await this.getRecipeDetails(items[i].dinner);
         
        // items[i].breakfast = breakfast[0];
        // items[i].lunch = lunch[0];
        // items[i].dinner = dinner[0];
        
        this.meals?.push(breakfast[0]); 
        this.meals?.push(lunch[0]);
        this.meals?.push(dinner[0]);
       items[i].meals = this.meals;

        
      }
    
    return items;
  }

  async getRecipeDetails(recipeId: string) {

    let recipeDetails = await this.recipeservice.getRecipe(recipeId);
    return recipeDetails;
    debugger;
  }


}


