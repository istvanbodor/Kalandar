import { Component, Injectable, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  isDelete = false;
  users: any;
  users$: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.users$ = this.authService.getUsersData().pipe(tap((user) => this.users = user ))    
  }

  DeleteUser(id: string) {
    this.authService.deleteEvent(id)
      .subscribe({
        next: () => {
          this.users$ = this.authService.getUsersData().pipe(tap((user) => {
            this.users = user;
          }));
        },
        error: (error) => {
          console.log('Error! =>', error)
        }
      });
  }

  ChangeRole(id: string) {
    this.authService.changeEvent(id)
      .subscribe({
        next: () => {
          this.users$ = this.authService.getUsersData().pipe(tap((user) => {
            this.users = user
          }));
        },
        error: (error) => {
          console.log('Error! =>', error)
        }
      });
  }
}