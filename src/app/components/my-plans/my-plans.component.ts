import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MealPlanService } from 'src/app/services/meal-plan.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.css']
})
export class MyPlansComponent implements OnInit {
  user: any = undefined;
  activeMealPlan?: { name: string, id: string, dietitian: string, mealtype: string, description: string, isActive: boolean };
  mealPlans: { name: string, id: string, dietitian: string, mealtype: string, description: string, isActive: boolean }[] = [];
  constructor(private userService: UserService, private mealPlanService: MealPlanService, private _snackBar: MatSnackBar) { }

  async ngOnInit() {

    this.refresh();
  }
  async refresh() {
    let plans: { name: string, id: string, dietitian: string, mealtype: string, description: string, isActive: boolean }[] = [];
    try {
      let user = await this.userService.getUserDetails();
      this.user = user;
      console.log(this.user);
      if (user?.plans) {
        console.log('process plans : ' + user.plans.length);
        for (let plan of user?.plans) {
          plan.mealplanid = encodeURIComponent(plan.mealplanid);
          let currplan = await this.fetchMealPlanDetails(plan.mealplanid);
          if (currplan && currplan.length > 0) {
            // console.log('mealplan ', currplan);
            let mealplan = currplan[0];
            plans.push({
              name: mealplan.name,
              id: mealplan.mealplanid,
              dietitian: mealplan.suggestedBy,
              mealtype: mealplan.mealplantype,
              description: mealplan.description.substring(0, 60) + '...',
              isActive: false
            });
          }
        }
      }
    }
    catch (Err) {
      console.log(Err);
    }
    for (let i = 0; i < plans.length; i++) {

      plans[i] = this.checkIfActive(plans[i]);
    }
    this.mealPlans = plans;
  }
  async fetchMealPlanDetails(mealplanId: string) {
    return await this.mealPlanService.getMealPlan(mealplanId);
  }
  checkIfActive(meal: { name: string, id: string, dietitian: string, mealtype: string, description: string, isActive: boolean }) {
    for (let plan of this.user.plans) {
      let mealid = encodeURIComponent(meal.id);
      console.log(plan.mealplanid + ':' + meal.id);
      if (plan.mealplanid == mealid) {
        console.log('match found ' + plan.mealplanid + ' is ' + plan.active);
        meal.isActive = !plan.active;
      }
    }


    return meal;
  }
  async subscribeMealPlan(mealplanid: any) {
    /*  this.existingUser = await this.userService.getLoggedInUser();
      debugger;
      console.log("Logged in User" + this.existingUser[0]);
      
      this.mealList = await this.userService.UpdateMealPlanForUser(mealplanid,this.existingUser[0])
      console.log("Diet updated");
      this.router.navigate(['/']);
      */
    console.log(mealplanid);
    let status = await this.userService.subscribeMealPlan(mealplanid);
    if (status) {
      this._snackBar.open(status.msg, 'dismiss', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 3000
      });
    }
    await this.refresh();
  }
}
