import { Component,ChangeDetectorRef, NgZone } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState, FormFieldTypes } from '@aws-amplify/ui-components';

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'endless-cmpe281';
  user: CognitoUserInterface | undefined;
  authState: AuthState=AuthState.Loading;
  constructor(private ref: ChangeDetectorRef,private ngZone:NgZone,private userService:UserService){
       this.userService.getUserDetails();
  }
  ngOnInit() {
    
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
    /*  if(this.authState==AuthState.SignedOut){
        this.accountService.clearUser();
      }*/
      this.ngZone.run(()=>this.ref.detectChanges()) ;
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
