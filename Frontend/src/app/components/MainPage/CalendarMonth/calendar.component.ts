import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { start } from '@popperjs/core';
import { CalendarEvent, EventColor } from 'calendar-utils';
import { getDay, parseISO } from 'date-fns';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

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
      end: parseISO(event.endTime),
      fullday: parseISO(event.fullDay),
      allDay: event.fullDay, 
    })))
  );

  constructor(private authService: AuthService){}


  ngOnInit(): void {
    this.authService.getProfile()
    .subscribe({
      next: (user) => {

 
      },
      error: (error) => {
        console.log('user events error => ', error)
      }
    })
  }
}
