import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
export interface UserRequest {
  username: string;

}

const ELEMENT_DATA: UserRequest[] = [
];

@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrls: ['./userupdate.component.css']
})
export class UserupdateComponent implements OnInit {

  displayedColumns: string[] = ['name','action'];
  dataSource: MatTableDataSource<UserRequest>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private userService:UserService,private _snackBar: MatSnackBar) { 
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.userService.getDietitianReqs().then((response:any)=>{
      console.log(response);
      this.dataSource=new MatTableDataSource<UserRequest>(response);
    });
  }
  refresh(){
    this.userService.getDietitianReqs().then((response:any)=>{
      console.log(response);
      this.dataSource=new MatTableDataSource<UserRequest>(response);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  async action(username:string,status:string){
    
    console.log(username+' : '+status);
    let resp=await this.userService.approval(username,status);
    if(resp){
      this._snackBar.open(resp.msg, 'dismiss', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration:3000
      });
    this.refresh();
   }
  }
}
