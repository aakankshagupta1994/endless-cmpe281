import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuardGuard } from './auth/authorization-guard.guard';
import { CreateMealPlanComponent } from './components/create-meal-plan/create-meal-plan.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { HomeComponent } from './components/home/home.component';
import { MealPlanComponent } from './components/meal-plan/meal-plan.component';
import { MealPlansComponent } from './components/meal-plans/meal-plans.component';
import { MyPlansComponent } from './components/my-plans/my-plans.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { UserupdateComponent } from './components/userupdate/userupdate.component';
const routes: Routes = [{
  path: '', component: HomeComponent
},
{
  path: 'createmealplan', component: CreateMealPlanComponent, canActivate:[AuthorizationGuardGuard],
  data: { 
    expectedRole: ['admin','dietitian']
  } 
},
{
  path: 'mealplans/:id',  component:MealPlanComponent, canActivate:[AuthorizationGuardGuard],
  data: { 
    expectedRole: ['admin','dietitian','user']
  } 
},
{
  path: 'mealplans',  component:MealPlansComponent, canActivate:[AuthorizationGuardGuard],
  data: { 
    expectedRole: ['admin','dietitian','user']
  } 
},
{
  path: 'createrecipe', component:CreateRecipeComponent, canActivate:[AuthorizationGuardGuard],
  data: { 
    expectedRole: ['admin','dietitian']
  } 
},
{
  path:'recipe', component: RecipeComponent, canActivate:[AuthorizationGuardGuard],
  data: { 
    expectedRole:  ['admin','dietitian','user']
  } 
},
{
  path:'myplans',component:MyPlansComponent, canActivate:[AuthorizationGuardGuard],
  data: { 
    expectedRole: ['user']
  } 
},
{
  path:'profile', component:ProfileComponent, canActivate:[AuthorizationGuardGuard],
  data: { 
    expectedRole: ['admin','dietitian','user']
  } 
},{
  path:'userupdate', component:UserupdateComponent, canActivate:[AuthorizationGuardGuard],
  data:{
    expectedRole:['admin']
  }
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
