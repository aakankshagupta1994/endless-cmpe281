import { Component, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Auth from '@aws-amplify/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  userRole:string='';
  user:any;
  showChat:boolean=false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  @Output() 
  fullfillment = new EventEmitter<any>();
  constructor(private breakpointObserver: BreakpointObserver,private _snackBar: MatSnackBar,private userService:UserService,private _router: Router) {}
  ngOnInit(){
    this.userService.getUserDetails().then((data)=>{
      this.user=data;
        this.userRole=data.usertype;
    }).catch((err)=>{
      console.log(err);
    });
  }
  onBotComplete(event: Event) {
      console.log('chat completed ',event);
      const { data, err } = (event as any).detail;
      if (data) {
            console.log('Chat fulfilled!', JSON.stringify(data));
            this.fullfillment.emit(data);
            this._snackBar.open(data.slots.MealType, 'dismiss', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration:3000
            });
            
            this._router.navigate(['/mealplans'],{ queryParams:{mealtype:data.slots.MealType}});
      } 
      if (err) console.error('Chat failed:', err);
  };
  toggleChat(){
    this.showChat=!this.showChat;
  }
  checkUserRole(userRoles:string[]){
    return userRoles.indexOf(this.userRole)!=-1?true:false;
  }
  async logout(){
    try{
      await Auth.signOut();
      this.userRole='';
  this.showChat=false;
      location.reload();
      }
      catch(Err){
        console.log(Err);
        console.log('Error Signing Out');
      }
  }
}
