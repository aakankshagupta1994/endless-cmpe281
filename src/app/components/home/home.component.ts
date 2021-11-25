import { MealPlanService } from 'src/app/services/meal-plan.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { input } from '@aws-amplify/ui';
import { UserService } from 'src/app/services/user.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  public display: boolean = false;
  mealplanid?: string;
  meals: any;
  mealPlanDetails: any;
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          // this block is for handset view
          { title: 'Breakfast', cols: 1, rows: 1, imageSrc: 'assets/img/Breakfast.jpg', titles: 'AvocadoToast' },
          { title: 'Lunch', cols: 1, rows: 1, imageSrc: 'assets/img/Lunch.jpg', titles: 'Whole Wheat Bread' },
          { title: 'Dinner', cols: 1, rows: 1, imageSrc: 'assets/img/Dinner.jpg', titles: 'Peel and mash avocado' }
        ];
      }

      return [
        { title: 'Breakfast', cols: 1, rows: 1, imageSrc: 'assets/img/Breakfast.jpg', titles: 'Avocado Toast' },
        { title: 'Lunch', cols: 1, rows: 1, imageSrc: 'assets/img/Lunch.jpg', titles: 'Whole Wheat Bread' },
        { title: 'Dinner', cols: 1, rows: 1, imageSrc: 'assets/img/Dinner.jpg', titles: 'Peel and mash avocado' }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService, private recipeservice: RecipeService, private mealplanservice: MealPlanService) {
    this.meals = [];
  }
  async ngOnInit() {

    this.userService.getUserDetails().then(data => {
      this.user = data;
    
      var that = this;
      if (this.user.isActive === true) {
        this.display = true;
        if(this.user&&this.user.plans&&this.user.plans.length==0){
          this.display=false;
        }
        else{
          let activeuserplan = this.user.plans.find((item: any) => {
            if (item.active === true) {
              return item;
            }
          });
          // this.mealplanid = this.user.activeplan;
  
          let data = this.getMealPlanDetails(activeuserplan).then(res => {
            console.log(res);
        
          })
        }
        

      }
    }).catch(err => {
      this.user = null;
    });

  
  }
  async getMealPlanDetails(userplan: any) {
   console.log(userplan);
   if(userplan){
    this.mealPlanDetails = await this.mealplanservice.getMealPlan(userplan.mealplanid);
 
    let userDate = userplan.subscribedOn.split('/');
    let date = new Date();
    date.setFullYear(JSON.parse(userDate[2]));
    date.setMonth(JSON.parse(userDate[0]) - 1);
    date.setDate(JSON.parse(userDate[1]));

    // let userDate1 = new Date(JSON.parse(userDate[2]),JSON.parse(userDate(0)), JSON.parse(userDate(1)));
    console.log(date);
    // let date = new Date();
    let day = new Date().getUTCDate() - date.getDate();
    if (this.mealPlanDetails.length > 0) {
      let completedata = await this.formatItems(this.mealPlanDetails[0].chart[day]);
      console.log(completedata);
      
      return this.mealPlanDetails;
    }
  }

  }

  async formatItems(items: any) {
    var that = this;

    // for (let i in items) {

    let breakfast = await this.getRecipeDetails(items.breakfast);
    let lunch = await this.getRecipeDetails(items.lunch);
    let dinner = await this.getRecipeDetails(items.dinner);

    // items[i].breakfast = breakfast[0];
    // items[i].lunch = lunch[0];
    // items[i].dinner = dinner[0];

    this.meals?.push(breakfast[0]);
    this.meals?.push(lunch[0]);
    this.meals?.push(dinner[0]);
    items.meals = this.meals;


    // }

    return items;
  }

  async getRecipeDetails(recipeId: string) {

    let recipeDetails = await this.recipeservice.getRecipe(recipeId);
    return recipeDetails;

  }


}
