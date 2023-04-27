import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';
import { ProfileComponent } from '../Profile/profile.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events$: any
  events: any

  constructor(private authService: AuthService, private profileComponent: ProfileComponent) { }

  ngOnInit(): void {
    this.authService.getProfile()
      .subscribe({
        next: (user) => {
          this.events$ = this.authService
            .getUserEvents(String(user.id)).pipe(tap((result) => {

            }))
        },
        error: (error) => {
          console.log('user events error => ', error)
        }
      })
  }

  DeleteEvent(id: string) {
    this.authService.deleteEvent(id)
      .subscribe({
        next: () => {
          this.authService.getProfile()
            .subscribe({
              next: (user) => {
                this.events$ = this.authService
                  .getUserEvents(String(user.id)).pipe()
              },
              error: (error) => {
                console.log('delete user event error => ', error)
              }
            })
        }
      })
  }

  EventId(id: string){
    return localStorage.setItem('eventId',id)
  }
}
