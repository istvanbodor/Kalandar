import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { start } from '@popperjs/core';
import { CalendarEvent } from 'calendar-utils';
import { getDay, parseISO } from 'date-fns';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-calendar-month',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CalendarMonthComponent implements OnInit{


  view: string = 'month';

  viewDate: Date = new Date();

  events$: any;

 
  events: Observable<CalendarEvent[]> = this.authService.getUserEvents(String(localStorage.getItem('userId')))
  .pipe(
    map((result: any) => result.map((event: any) => ({
      title: event.event,
      start: parseISO(event.startTime),
      fullday: parseISO(event.fullDay),
      allDay: event.fullDay,
      
    })))
  );

  constructor(private authService: AuthService){}


  ngOnInit(): void {
    this.userId =this.authService.getProfile()
    .subscribe({
      next: (user) => {

 
      },
      error: (error) => {
        console.log('user events error => ', error)
      }
    })
  }
}
