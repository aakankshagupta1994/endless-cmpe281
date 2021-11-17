import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'endless-cmpe281';
  constructor(private userService:UserService){
       this.userService.getUserDetails();
  }
  
}
