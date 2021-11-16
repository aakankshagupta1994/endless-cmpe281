import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { HttpClient,HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor(recipeService:RecipeService, private http:HttpClient) { }

  
  ngOnInit(): void {
    this.http.get<any>('https://r76zppz36k.execute-api.us-west-2.amazonaws.com/dev/recipes').subscribe((res) => {
      // console.log(res);
      // this.ListData = res.Items;
      // console.log(this.ListData); 
    });

  }

}
