import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { CreateRecipeRequest } from 'src/app/interfaces/recipe';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'createrecipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router,private userService: UserService, private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
  public ingredients: any[] = [{
    id: 1,
    ingredient: '',
    quantity: '',
    macros: ''
  }];

  public steps: any[] = [{
    id: 1,
    step: ''
  }];

  addIngredient() {
    this.ingredients.push({
      id: this.ingredients.length + 1,
      ingredient: '',
      quantity: '',
      macros: ''
    });
  }

  addStep() {
    this.steps.push({
      id: this.steps.length + 1,
      step: ''
    });
  }

  removeIngredient(i: number) {
    this.ingredients.splice(i, 1);
  }

  removeStep(j: number) {
    this.steps.splice(j, 1);
  }
  recipe?: CreateRecipeRequest;
  recipeName: string = '';
  type: string = '';
  existingUser : any;

  async onSubmit() {

    // alert(this.ingredients);

    // let recipeId = this.recipeName.concat(generateString(5));

    this.existingUser = await this.userService.getLoggedInUser();
    // dietecianId will be fetched from the users profile details
    let user = this.existingUser.username;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length: number) {
      let result = ' ';
      const charactersLength = characters.length;
      for (let i = length; i > 0; i--) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }

    let recipe: CreateRecipeRequest = {
      recipeid: generateString(6).trim(),
      dietitianid: user,
      recipeName: this.recipeName,
      type: this.type,
      procedure: this.steps,
      ingredients: this.ingredients
    };

    // let body = {"recipeId":(this.recipeName.substr(0,this.recipeName.indexOf(' ')).trim().concat(generateString(5))), "recipeName": this.recipeName,"dietecianId": dietecianId,"type":this.type,"procedure":this.steps , "ingredients":this.ingredients };
    //  let req = { "body" : recipe}
     
    var resp = await this.recipeService.createRecipe(recipe);
    // debugger;
    if(resp!=null){
      window.alert("recipe created");
    }
     
  }

}