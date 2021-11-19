import { MealPlanService } from './../../services/meal-plan.service';
import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-meal-plans',
  templateUrl: './meal-plans.component.html',
  styleUrls: ['./meal-plans.component.css']
})
export class MealPlansComponent implements OnInit {
  mealList: any;
  images = ['https://cdn.shopify.com/s/files/1/1517/2462/articles/VeganmealPrep_1512x.jpg', 'https://forgetsugarfriday.com/wp-content/uploads/2019/05/keto-diet-meal-plan-featured.png?resize=980:*', 'https://cdn.shopify.com/s/files/1/1517/2462/articles/VeganmealPrep_1512x.jpg'];
  // selectedImage = this.images.random();
  item = this.images[Math.floor(Math.random() * this.images.length)];

  constructor(private mealplanservice: MealPlanService, private userService: UserService) {

  }

  async ngOnInit() {
    
    this.mealList = await this.mealplanservice.getList();
    console.log("mealplans component  " + this.mealList);
  }

  async subscribeMealPlan(mealplanid : any)
  {
    this.mealList = await this.userService.UpdateMealPlanForUser(mealplanid)
    console.log("Diet updated");
  }

}
