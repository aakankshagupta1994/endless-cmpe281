import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mealplan } from 'src/app/interfaces/mealplan';
import { MealPlanService } from 'src/app/services/meal-plan.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent  {
  
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          // this block is for handset view
          { title: 'Breakfast', cols: 1, rows: 1 ,imageSrc:'assets/img/Breakfast.jpg', titles:'AvocadoToast'},
          { title: 'Lunch', cols: 1, rows: 1,imageSrc:'assets/img/Lunch.jpg' ,titles:'Whole Wheat Bread'},
          { title: 'Dinner', cols: 1, rows: 1 ,imageSrc:'assets/img/Dinner.jpg',titles:'Peel and mash avocado'}
        ];
      }

      return [
        { title: 'Breakfast', cols: 1, rows: 1, imageSrc:'assets/img/Breakfast.jpg', titles:'Avocado Toast' },
        { title: 'Lunch', cols: 1, rows: 1,imageSrc:'assets/img/Lunch.jpg',titles:'Whole Wheat Bread' },
        { title: 'Dinner', cols: 1, rows: 1,imageSrc:'assets/img/Dinner.jpg',titles:'Peel and mash avocado' }
      ];
    })
  );
  constructor(private breakpointObserver: BreakpointObserver) { }



}
