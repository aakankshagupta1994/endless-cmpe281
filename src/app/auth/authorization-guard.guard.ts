import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuardGuard implements CanActivate {
  constructor(public userService: UserService, public router: Router) {}

  
   async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Promise<boolean | UrlTree> {
    let allowedRoles=  route.data.expectedRole as string[];
    let user=await this.userService.getUserDetails() ?? '';
    console.log('logged in user ',user);
    if(this.checkDietitian(user,allowedRoles)){
      return true;
    }
    if(allowedRoles.indexOf(user.usertype)!=-1){
        return true;
    }
    else
    {
      this.router.navigate(['']);
    }
    return false;
  }
   checkDietitian(user:any,allowedRoles:string[]){
      if(allowedRoles.indexOf('dietitian')!=-1&&user){
        return user.isdietitian;
      }
      else false;
  }
}
