import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { CreateRecipeRequest } from 'src/app/interfaces/recipe';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'createrecipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router,private userService: UserService, private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
  public ingridients: any[] = [{
    id: 1,
    ingridient: '',
    quantity: '',
    macros: ''
  }];

  public steps: any[] = [{
    id: 1,
    step: ''
  }];

  addIngridient() {
    this.ingridients.push({
      id: this.ingridients.length + 1,
      ingridient: '',
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

  removeIngridient(i: number) {
    this.ingridients.splice(i, 1);
  }

  removeStep(j: number) {
    this.steps.splice(j, 1);
  }
  recipe?: CreateRecipeRequest;
  recipeName: string = '';
  type: string = '';
  existingUser : any;

  async onSubmit() {

    // alert(this.ingridients);

    // let recipeId = this.recipeName.concat(generateString(5));

    this.existingUser = await this.userService.getLoggedInUser();
    // dietecianId will be fetched from the users profile details
    let dietitianid = this.existingUser;
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
      recipeid: generateString(5),
      dietitianid: dietitianid,
      recipeName: this.recipeName,
      type: this.type,
      procedure: this.steps,
      ingredients: this.ingridients
    };

    // let body = {"recipeId":(this.recipeName.substr(0,this.recipeName.indexOf(' ')).trim().concat(generateString(5))), "recipeName": this.recipeName,"dietecianId": dietecianId,"type":this.type,"procedure":this.steps , "ingridients":this.ingridients };
     let req = { "body" : recipe}
    this.recipeService.createRecipe(req);

  }

}