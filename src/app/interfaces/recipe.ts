import { ingredient } from "./ingredient";

export interface Recipe {
 
        recipeid: string,
        dietitianid: string,
        recipeName:string,
        type:string,
        procedure: string[],
        ingredients: ingredient[]
        
}
export interface CreateRecipeRequest {

    recipeid: string,
    dietitianid: string,
    recipeName:string,
    type:string,
    procedure: string[],
    ingredients: ingredient[]

}