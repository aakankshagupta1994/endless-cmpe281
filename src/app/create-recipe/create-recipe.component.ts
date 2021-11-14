import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent {
  // addressForm = this.fb.group({
  //   company: null,
  //   firstName: [null, Validators.required],
  //   lastName: [null, Validators.required],
  //   address: [null, Validators.required],
  //   address2: null,
  //   city: [null, Validators.required],
  //   state: [null, Validators.required],
  //   postalCode: [null, Validators.compose([
  //     Validators.required, Validators.minLength(5), Validators.maxLength(5)])
  //   ],
  //   shipping: ['free', Validators.required]
  // });

  // hasUnitNumber = false;

  // constructor(private fb: FormBuilder, private http: HttpClient) {}


  constructor( private http: HttpClient) {}


  recipeId: string='';
  ingridient: string = '';
  quantity: string = '';
  macros: string= '';
  procedure: string='';
  recipeName: string='';
 

  onSubmit(): void {
    console.log("Printing")
    // alert('Thanks!');
    
    console.log("Printing")
    console.log(this.ingridient);
    let body = {"recipeId":"recipe101","dietecianId":"dietitian101","ingridient":this.ingridient,"quantity":this.quantity,"macros":this.macros,"procedure":this.procedure}

    let promise = new Promise((resolve, reject) => {
      this.http.post('https://r76zppz36k.execute-api.us-west-2.amazonaws.com/dev/recipe', body).toPromise().then(
        res => {
          console.log("Upload Successful!!");
          // window.location.reload();
          // this.http.get<any>('https://oq3gb36js9.execute-api.us-west-2.amazonaws.com/dev/file?createdBy=gupta.aakanksha123@gmail.com').subscribe((res) => {
            console.log(res);
          //   this.ListData = res.Items;
          //   console.log(this.ListData);
          // });
        }
      )
    });
    // return promise;
    // return this.ListData;

  

  }
}
