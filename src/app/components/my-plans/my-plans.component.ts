import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.css']
})
export class MyPlansComponent implements OnInit {
  activeMealPlan?:{name:string,id:string,dietitian:string,mealtype:string};
  mealPlans:{name:string,id:string,dietitian:string,mealtype:string}[]=[];
  constructor() { }

  ngOnInit(): void {
    this.activeMealPlan={
      name:"Vegan Meal Plan",
      dietitian:"New Dietitian 1",
      mealtype:"VEGAN",
      id:"0"
    };
    this.mealPlans=[{
      name:"Vegan Meal Plan",
      dietitian:"New Dietitian 1",
      mealtype:"VEGAN",
      id:"0"
    },
    {
      name:"High Protein Low Carb Meal Plan",
      dietitian:"New Dietitian 2",
      mealtype:"MEAT",
      id:"1"
    },{
      name:"Vegetarian Meal Plan",
      dietitian:"New Dietitian 1",
      mealtype:"VEGETARIAN",
      id:"2"
    },
    {
      name:"Weight Loss Meal Plan",
      dietitian:"New Dietitian 1",
      mealtype:"MEAT",
      id:"3"
    },{
      name:"High Protein Low Carb Meal Plan",
      dietitian:"New Dietitian 4",
      mealtype:"MEAT",
      id:"1"
    },{
      name:"Vegetarian Meal Plan",
      dietitian:"New Dietitian 2",
      mealtype:"VEGETARIAN",
      id:"4"
    },
    {
      name:"Weight Loss Meal Plan",
      dietitian:"New Dietitian 3",
      mealtype:"MEAT",
      id:"5"
    }]
    
  }

}
