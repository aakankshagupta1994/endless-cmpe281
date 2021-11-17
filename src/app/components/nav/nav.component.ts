import { Component, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

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
  constructor(private breakpointObserver: BreakpointObserver) {}
  onBotComplete(event: Event) {
      console.log('chat completed ',event);
      const { data, err } = (event as any).detail;
      if (data) {
            console.log('Chat fulfilled!', JSON.stringify(data));
            this.fullfillment.emit(data);
      }
      if (err) console.error('Chat failed:', err);
  };
  toggleChat(){
    this.showChat=!this.showChat;
  }
}
