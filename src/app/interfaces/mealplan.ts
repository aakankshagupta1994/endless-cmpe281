import { Recipe } from "./recipe";

export interface Mealplan {
    mealplanid?:string,
    name:string,
    description: string,
    suggestedBy:string,
    mealplantype:string,
    duration:number,
    recipes?:Recipe[]
}
export interface CreateMealplanRequest {
    mealplanid?:string,
    name:string,
    description: string,
    suggestedBy:string,
    mealplantype:string,
    duration:number,
    recipes?:Recipe[]
}
export interface CreateMealplanResponse {

}
export interface ReadMealplanRequest {
}
export interface ReadMealplanResponse {
}
export interface UpdateMealplanRequest {
}
export interface UpdateMealplanResponse {
}