import { Recipe } from "./recipe";

export interface Mealplan {
    mealplanid?:string,
    name:string,
    description: string,
    suggestedBy:string,
    chart:any[],
    duration:number,
    mealplantype: string
    //recipes?:Recipe[]
}
export interface CreateMealplanRequest {
    mealplanid?:string,
    name:string,
    description: string,
    suggestedBy:string,
    chart:any[],
    duration:number,
    mealplantype: string
    //recipes?:Recipe[]
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
export interface filterMealType {
    mealtype : string
}
