import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'endless-cmpe281';
  onChatCompleted(data:any){
    console.log('chat response : ',data);
  }
}
