import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  isDelete = false;
  users: any;
  users$: any;
  user: any
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.users$ = this.authService.getUsersData().pipe(tap((user) => this.users = user )) 
  }

  ngOnDestroy(): void {
    this.authService.getProfile().subscribe({
      next: (result: any[]) => {
        this.user = result;
        localStorage.removeItem('userRole')
        localStorage.setItem('userRole', this.user.role)
      },
      error: (error: any[]) => {
        console.error('Error getting user profile =>', error);
      }
    });
  }

  DeleteUser(id: string) {
    this.authService.deleteUser(id)
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

  ChangeRole(id: string, body: any) {  
    this.authService.updateRole(id, body)
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