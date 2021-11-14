import { Recipe } from "./recipe";

export interface Mealplan {
    mealPlanId?:string,
    name:string,
    description: string,
    suggestedBy:string,
    mealPlanType:string,
    duration:number,
    recipes?:Recipe[]
}
export interface CreateMealplanRequest {
    name:string,
    description: string,
    suggestedBy:string,
    mealPlanType:string,
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