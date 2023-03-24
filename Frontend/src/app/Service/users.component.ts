import { Component, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';
import { UsersApiService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  
  users: any;
  users$: any;
  constructor(private authService:AuthService) {}
  
  ngOnInit(): void{
    this.users$ = this.authService.getUsersData().pipe(tap((user) => this.users = user))
  }
}
