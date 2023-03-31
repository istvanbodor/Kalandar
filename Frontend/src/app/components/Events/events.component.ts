import { Component, OnInit } from '@angular/core';
import { id } from 'date-fns/locale';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{

  events$: any
  events: any
  user: any

  constructor(private authService: AuthService){}

  

  ngOnInit(): void {

    this.events$ = this.authService.getAllEvents().pipe(tap((result) => this.events = result ))


    // this.authService.getProfile().subscribe({
    //   next: (result: any[]) => {
    //     this.user = result;
    //     // console.log(this.user)

    //     this.events$ = this.authService.getUserEvents(this.user.id).subscribe()
    //   },
    //   error: (error: any[]) => {
    //     console.error('Error getting user profile =>', error);
    //   }
    // });

   
  }
}
