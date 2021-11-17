import { Component, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  showChat:boolean=false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  @Output() 
  fullfillment = new EventEmitter<any>();
  constructor(private breakpointObserver: BreakpointObserver,private _snackBar: MatSnackBar) {}
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
      }
      if (err) console.error('Chat failed:', err);
  };
  toggleChat(){
    this.showChat=!this.showChat;
  }
}
