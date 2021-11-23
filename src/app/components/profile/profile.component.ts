import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  constructor(private userService:UserService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUserDetails().then(data=>{
        this.user=data;
    }).catch(err=>{
      this.user=null;
    });
  }
  async upgradeUser(event:any){
      let result=await this.userService.upgradeUser();
      if(result){
        this._snackBar.open(result.msg, 'dismiss', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration:3000
        });
      }
  }

}
