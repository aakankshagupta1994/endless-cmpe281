import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMealPlanComponent } from './components/create-meal-plan/create-meal-plan.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { HomeComponent } from './components/home/home.component';
import { MealPlanComponent } from './components/meal-plan/meal-plan.component';
import { MyPlansComponent } from './components/my-plans/my-plans.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecipeComponent } from './components/recipe/recipe.component';
const routes: Routes = [{
  path: '', component: HomeComponent
},
{
  path: 'createmealplan', component: CreateMealPlanComponent
},
{
  path: 'mealplan',  component:MealPlanComponent
},
{
  path: 'createrecipe', component:CreateRecipeComponent
},
{
  path:'recipe', component: RecipeComponent
},
{
  path:'myplans',component:MyPlansComponent
},
{
  path:'profile', component:ProfileComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
