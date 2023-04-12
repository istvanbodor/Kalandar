import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { start } from '@popperjs/core';
import { CalendarEventAction } from 'angular-calendar';
import { CalendarEvent, EventColor } from 'calendar-utils';
import { addDays, getDay, isSameDay, isSameMonth, parseISO } from 'date-fns';
import { Observable, Subject, map, tap } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';
import { EventsModalComponent } from '../Modals/EventsModal/eventsModal.component';

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

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;


  view: string = 'month';

  viewDate: Date = new Date();

  events$: any;

  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  constructor(private authService: AuthService, private modal: NgbModal, private eventsModal: EventsModalComponent){}

  ngOnInit(): void { 
    this.authService.getProfile().subscribe((user) =>{
      this.events$ = this.authService.getUserEvents(String(user.id)).pipe(tap((result) => {
      }))
    })
  //   this.authService.getProfile()
  //   .subscribe({
  //     next: (result) => {

  //     },
  //     error: (error) => {
  //       console.log('user events error => ', error)
  //     }
  //   })
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modal.open(this.modalContent);
  }

  refresh = new Subject<void>();
 
  events: Observable<CalendarEvent[]> =this.authService.getUserEvents(String(localStorage.getItem('userId')))
  .pipe(
    map((result: any) => result.map((event: any) => ({
      title: event.event,
      start: parseISO(event.startTime),
      end: parseISO(event.endTime),
      fullday: parseISO(event.fullDay),
      allDay: event.fullDay,
      
      draggable: true
    })))
   
  )
  
  // [
  //   {
  //     title: 'asd',
  //     start: new Date(),
  //     end: addDays(new Date(), 3),
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   }
  // ]

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
                this.events$ = this.authService
                  .getUserEvents(String(user.id)).pipe()
              },
              error: (error) => {
                console.log('user events error => ', error)
              }
            })
        }
      })
  }

  storeEventId(id: string){
    return localStorage.setItem('eventId',id)
  }


  



}
