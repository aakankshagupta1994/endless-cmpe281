import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mealplan } from 'src/app/interfaces/mealplan';
import { MealPlanService } from 'src/app/services/meal-plan.service';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent implements OnInit {
  private mealPlanId?:string;
  private mealPlan?:Mealplan;
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private mealPlanService:MealPlanService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (params)=>{
      this.mealPlanId=params.get('id')??'';
      this.mealPlan=await this.mealPlanService.getMealPlan(this.mealPlanId);
    });
  }

}
