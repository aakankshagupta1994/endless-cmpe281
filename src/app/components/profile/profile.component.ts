import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUserDetails().then(data=>{
        this.user=data;
    }).catch(err=>{
      this.user=null;
    });
  }

}
