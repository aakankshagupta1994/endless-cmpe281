import { Ingridient } from "./ingridient";

export interface Recipe {
 
        recipeid: string,
        dietitianid: string,
        recipeName:string,
        type:string,
        procedure: string[],
        ingridients: Ingridient[]
        
}
export interface CreateRecipeRequest {

    recipeid: string,
    dietitianid: string,
    recipeName:string,
    type:string,
    procedure: string[],
    ingridients: Ingridient[]

}
