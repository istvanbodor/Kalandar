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

  events$: any

  userId: any

 
  events: Observable<CalendarEvent[]> = this.authService.getUserEvents(String(localStorage.getItem('userId')))
  .pipe(
    map((result: any) => result.map((event: any) => ({
      title: event.event,
      start: parseISO(event.startTime),
      end: parseISO(event.endTime),
      fullday: event.fullDay,
      category: event.category,
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



  
  
  // today: Date = new Date();
  // currentYear: number = this.today.getFullYear();
  // currentMonth: number = this.today.getMonth();
  // currentDay: number = this.today.getDate();
  // firstDay: Date = new Date(new Date().setDate(1))
  // lastDay: Date = new Date(new Date().setDate(31));
  // startDate: Object = new Date(this.currentYear, this.currentMonth, 1);
  // endDate: Object =  new Date(this.currentYear, this.currentMonth, 31);



  // id= 0;



  // constructor() {

  //   }

  //   ngOnInit(): void {
  //     this.id = setInterval((result :number) => {
  //       this.today = new Date();
  //     }, 1000);
  //   }



  //   nextDay() {
  //     return this.today.setDate(this.today.getDate() + 1)
  //   }

  //   dayBefore(){
  //     return this.today.setDate(this.today.getDate() - 1)
  //   }

  //   dayNow(){
  //     return this.today
  //   }


  //   days(){
  //     const Days = []

  //     const numDays = new Date(this.currentYear,this.currentMonth + 1, 0).getDate();
  //     for(let day = 1; day <= numDays; day++) {
  //       const date = new Date(this.currentYear, this.currentMonth, day);
  //       const dayOfMonth = date.getDate();
  //       Days.push([dayOfMonth])
  //     }

  //     return Days

    //   const weeks = [];
    //   let week = [];
    //   for (let i = 0; i < Days.length; i++) {
    //     week.push(Days[i]);
    //     if (i % 7 === 6) {
    //       weeks.push(week);
    //       week = [];
    //     }
    //   }
    //   if (week.length > 0) {
    //     weeks.push(week);
    //   }
    //   return weeks
    // }
}
