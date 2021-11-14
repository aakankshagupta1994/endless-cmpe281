import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { SampleComponent } from './sample/sample.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipe', component: RecipeComponent },
  { path: 'app-create-recipe', component: CreateRecipeComponent},
  { path: 'sample', component: SampleComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
