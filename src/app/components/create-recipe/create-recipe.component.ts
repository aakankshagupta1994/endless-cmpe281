import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'createrecipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private router:Router,private recipeService:RecipeService, private http:HttpClient) { }

  ngOnInit(): void {
  }
  public ingridients: any[] = [{
    id: 1,
    ingridient: '',
    quantity: '',
    macros: ''
  }];
  
  addIngridient() {
    this.ingridients.push({
      id: this.ingridients.length + 1,
      ingridient: '',
      quantity: '',
      macros: ''
    });
  }
  
  removeIngridient(i: number) {
    this.ingridients.splice(i, 1);
  }
  
    // recipeId: string='';
    // ingridient: string = '';
    // quantity: string = '';
    // macros: string= '';
    procedure: string='';
    recipeName: string='';
   
    onSubmit(): void {
   
      // alert(this.ingridients);
  
      // let recipeId = this.recipeName.concat(generateString(5));
      // dietecianId will be fetched from the users profile details
      let dietecianId = 'd102';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
      function generateString(length: number) {
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = length; i > 0; i--) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }
      
      let body = {"recipeId":(this.recipeName.substr(0,this.recipeName.indexOf(' ')).trim().concat(generateString(5))), "dietecianId": dietecianId,"procedure":this.procedure , "ingridients":this.ingridients };
      
        this.recipeService.createRecipe(body); 
      

      // console.log(this.ingridient);
      // let body = {"recipeId":"recipe101","dietecianId":"dietitian101","ingridient":this.ingridient,"quantity":this.quantity,"macros":this.macros,"procedure":this.procedure};
      // let body = Object.assign({}, this.ingridients); // worked and added indexes
      // let body = { ...this.ingridients};  // worked and added indexes

      // let promise = new Promise((resolve, reject) => {
      //   this.http.post('https://r76zppz36k.execute-api.us-west-2.amazonaws.com/dev/recipe', body).toPromise().then(
      //     res => {
      //       console.log("Upload Successful!!");
      //       // window.location.reload();
           
      //         console.log(res);
      //       //   this.ListData = res.Items;
      //       //   console.log(this.ListData);
            
      //     }
      //   )
      // });
  
      
    }
  
}