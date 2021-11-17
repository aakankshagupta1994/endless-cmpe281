import { Component, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    @Output() 
    fullfillment = new EventEmitter<any>();
  constructor(private breakpointObserver: BreakpointObserver,router:Router) {}
  onBotComplete(event: Event) {
    console.log('chat completed ',event);
    const { data, err } = (event as any).detail;
    if (data) {console.log('Chat fulfilled!', JSON.stringify(data));
    this.fullfillment.emit(data);
  }
    if (err) console.error('Chat failed:', err);
  };
}
