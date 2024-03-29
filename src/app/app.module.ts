import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/* import AmplifyUIAngularModule  */
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateMealPlanComponent } from './components/create-meal-plan/create-meal-plan.component';
import { MealPlanComponent } from './components/meal-plan/meal-plan.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { MyPlansComponent } from './components/my-plans/my-plans.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MealPlansComponent } from './components/meal-plans/meal-plans.component';
import { AxiosConfigFactory, AxiosInterceptorService } from './services/axios-interceptor.service';
import { TokenInterceptorInterceptor } from './intercpetors/token-interceptor.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FlexLayoutModule } from "@angular/flex-layout";
import { UserupdateComponent } from './components/userupdate/userupdate.component';
import { UserComponent } from './user/user.component';

import { PipetransformerPipe } from './components/pipetransformer.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    CreateMealPlanComponent,
    MealPlanComponent,
    CreateRecipeComponent,
    RecipeComponent,
    MyPlansComponent,
    ProfileComponent,
    MealPlansComponent,
    RecipeDetailsComponent,
    UserupdateComponent,
    UserComponent,
    
    PipetransformerPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    /* configure app with AmplifyUIAngularModule */
    AmplifyUIAngularModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    HttpClientModule, 
    NgbModule,
    FormsModule, 
    MatCardModule, 
    MatExpansionModule, 
    CdkAccordionModule

  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: AxiosConfigFactory,
    deps: [AxiosInterceptorService],
    multi: true
}, 
PipetransformerPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
