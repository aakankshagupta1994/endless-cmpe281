import { MealPlanComponent } from './meal-plan/meal-plan.component';
import { filterMealType } from './../interfaces/mealplan';
import { Mealplan } from 'src/app/interfaces/mealplan';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipetransformer'
})
export class PipetransformerPipe implements PipeTransform {

  transform(mealList: any[], val: any): any {

    if (val !== undefined)
    {
      mealList = mealList.filter(meal => meal.mealplantype.toLowerCase() === val);
      return mealList;
    }
    else
    {
      return mealList;
    }
    
  }

}
