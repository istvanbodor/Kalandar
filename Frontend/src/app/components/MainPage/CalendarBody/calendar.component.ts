import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, EventColor } from 'calendar-utils';
import { isSameDay, isSameMonth, parseISO } from 'date-fns';
import { Observable, Subject, map, pipe, tap } from 'rxjs';
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

export class CalendarBodyComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;


  view: string = 'month';

  viewDate: Date = new Date();

  eventsApi: any;

  events$: any;

  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  constructor(private authService: AuthService, private modal: NgbModal) { }


  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent);
  }

  refresh = new Subject<void>();

  events: Observable<CalendarEvent[]> = this.authService.getUserEvents(String(localStorage.getItem('userId')))
    .pipe(
      map((result: any) => result.map((event: any) => ({
        id: event.id,
        title: event.event,
        start: parseISO(event.startTime),
        end: parseISO(event.endTime),
        fullDay: event.fullDay,
      })))
    )

  ngOnInit(): void {
    this.authService.getProfile().subscribe((user) => {
      this.eventsApi = this.authService.getUserEvents(String(user.id)).pipe(tap((result) => {
      }))

      this.events.subscribe(result => {
        this.events$ = result
        console.log(this.events$)
      })
    })
  }

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  DeleteEvent(id: string) {
    this.authService.deleteEvent(id)
      .subscribe({
        next: () => {
          this.authService.getProfile()
            .subscribe({
              next: (user) => {
                this.eventsApi = this.authService
                  .getUserEvents(String(user.id)).pipe()
              },
              error: (error) => {
                console.log('user events error => ', error)
              }
            })
        }
      })
  }

  storeEventId(id: string) {
    return localStorage.setItem('eventId', id)
  }
}
