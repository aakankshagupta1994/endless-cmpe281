import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { input } from '@aws-amplify/ui';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 
  user:any;
  public display : boolean=false;

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          // this block is for handset view
          { title: 'Breakfast', cols: 1, rows: 1 ,imageSrc:'assets/img/Breakfast.jpg', titles:'AvocadoToast'},
          { title: 'Lunch', cols: 1, rows: 1,imageSrc:'assets/img/Lunch.jpg' ,titles:'Whole Wheat Bread'},
          { title: 'Dinner', cols: 1, rows: 1 ,imageSrc:'assets/img/Dinner.jpg',titles:'Peel and mash avocado'}
        ];
      }

      return [
        { title: 'Breakfast', cols: 1, rows: 1, imageSrc:'assets/img/Breakfast.jpg', titles:'Avocado Toast' },
        { title: 'Lunch', cols: 1, rows: 1,imageSrc:'assets/img/Lunch.jpg',titles:'Whole Wheat Bread' },
        { title: 'Dinner', cols: 1, rows: 1,imageSrc:'assets/img/Dinner.jpg',titles:'Peel and mash avocado' }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,private userService:UserService) {

  }
  ngOnInt(){
    this.userService.getUserDetails().then(data=>{
      this.user=data;
      if(this.user.activeplan){
        this.display=true;
      }
  }).catch(err=>{
    this.user=null;
  });
  }
}
