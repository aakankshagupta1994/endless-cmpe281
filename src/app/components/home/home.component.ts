import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          // this block is for handset view
          { title: 'Diet 1', cols: 1, rows: 1 },
          { title: 'Diet 2', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Diet 1', cols: 1, rows: 1 },
        { title: 'Diet 2', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) { }
}
