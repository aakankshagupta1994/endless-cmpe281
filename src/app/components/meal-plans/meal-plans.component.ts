import { MealPlanService } from './../../services/meal-plan.service';
import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/filter';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-meal-plans',
  templateUrl: './meal-plans.component.html',
  styleUrls: ['./meal-plans.component.css']
})
export class MealPlansComponent implements OnInit {

  mealList: any;
  existingUser: any;
  filter: any = {};
  images = ['https://cdn.shopify.com/s/files/1/1517/2462/articles/VeganmealPrep_1512x.jpg', 'https://forgetsugarfriday.com/wp-content/uploads/2019/05/keto-diet-meal-plan-featured.png?resize=980:*', 'https://cdn.shopify.com/s/files/1/1517/2462/articles/VeganmealPrep_1512x.jpg'];
  // selectedImage = this.images.random();
  item = this.images[Math.floor(Math.random() * this.images.length)];

  constructor(private mealplanservice: MealPlanService, private userService: UserService, private route: ActivatedRoute,
    private router: Router, private _snackBar: MatSnackBar) {

  }

  async ngOnInit() {

    this.mealList = await this.mealplanservice.getList();
    console.log("mealplans component  " + this.mealList);
    this.route.queryParams
      .filter(params => params.mealtype)
      .subscribe(params => {
        console.log(params); // { order: "popular" }

        this.filter = params.mealtype;
        console.log(this.filter); // popular
      }
      );
  }

  async subscribeMealPlan(mealplanid: any) {
    /*  this.existingUser = await this.userService.getLoggedInUser();
      debugger;
      console.log("Logged in User" + this.existingUser[0]);
      
      this.mealList = await this.userService.UpdateMealPlanForUser(mealplanid,this.existingUser[0])
      console.log("Diet updated");
      this.router.navigate(['/']);
      */
    let status = await this.userService.subscribeMealPlan(mealplanid);
    if (status) {
      this._snackBar.open(status.msg, 'dismiss', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 3000
      });
    }
  }

}
