import { Component, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { UsersApiService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  title = 'apidata';
  users: any;
  users$: any;
  constructor(private usersapiservice:UsersApiService) {}
  
  ngOnInit(): void{
    this.users$ = this.usersapiservice.getUsersData().pipe(tap((user) => this.users = user))
  }
}
