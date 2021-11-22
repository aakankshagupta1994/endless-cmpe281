import { Ingridient } from "./ingridient";

export interface Recipe {
 
        recipeid: string,
        dietecianId: string,
        recipeName:string,
        type:string,
        procedure: string[],
        ingridients: Ingridient[]
        
}
export interface CreateRecipeRequest {

    recipeid: string,
    dietecianId: string,
    recipeName:string,
    type:string,
    procedure: string[],
    ingridients: Ingridient[]

}
