import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';
import { ProfileComponent } from '../Profile/profile.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{

  events$: any
  events: any

  constructor(private authService: AuthService, private profileComponent: ProfileComponent){}

  

  ngOnInit(): void {
    //All events

    // this.events$ = this.authService.getAllEvents().pipe(tap((result) => {
    //   this.events = result
    //   console.log(this.events)
    // } ))

    // console.log('Value type =>',(this.profileComponent.userId()))
    this.authService.getProfile()
    .subscribe({
      next: (user) =>{
      this.events$ = this.authService
      .getUserEvents(String(user.id)).pipe(tap((result) => {
        // this.events = result
        // console.log(this.events)
      }))
    },
    error: (error) =>{
      console.log('user events error => ', error)
    }
  }) 
  }

  DeleteEvent(id: string){
    this.authService.deleteEvent(id)
      .subscribe({
        next: () => {
          this.authService.getProfile()
          .subscribe({
            next: (user) =>{
              this.events$ = this.authService
              .getUserEvents(String(user.id)).pipe(tap((result) => {
                // this.events = result
                // console.log(this.events)
              }))
            },
            error: (error) =>{
              console.log('user events error => ', error)
            }
          })
        }
      })
    }
  
}
