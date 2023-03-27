import { Component, Injectable, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';
import { CommunicationService } from './communication.service';
import { UsersApiService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  
  isDelete = false;
  users: any;
  users$: any;
  constructor(private authService:AuthService,private communicationService: CommunicationService) {}
  
  ngOnInit(): void{
    this.users$ = this.authService.getUsersData().pipe(tap((user) => this.users = user))
  }

  deleteEvent(){
    this.communicationService.deleteEventEmitter.subscribe((click) => this.isDelete = click)
  }

  ngOnDestroy(): void {
    this.communicationService.deleteEventEmitter.unsubscribe();
  }
}
