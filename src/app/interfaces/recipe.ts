import { Ingridient } from "./ingridient";

export interface Recipe {
 
        recipeId: string,
        dietecianId: string,
        recipeName:string,
        type:string,
        procedure: string[],
        ingridients: Ingridient[]
        
}
export interface CreateRecipeRequest {

    recipeId: string,
    dietecianId: string,
    recipeName:string,
    type:string,
    procedure: string[],
    ingridients: Ingridient[]

}
