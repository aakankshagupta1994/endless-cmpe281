import { Component, OnInit } from '@angular/core';
export interface UserRequest {
  name: string;
  id: number;
}

const ELEMENT_DATA: UserRequest[] = [
  {id: 1, name: 'Dietitian 1'},
  {id: 2, name: 'Dietitian 2' },
  {id: 3, name: 'Dietitian 3'},
];

@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrls: ['./userupdate.component.css']
})
export class UserupdateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['id','name','action'];
  dataSource = ELEMENT_DATA;

}
