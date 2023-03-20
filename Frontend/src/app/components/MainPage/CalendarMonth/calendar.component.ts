import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarMonthComponent implements OnInit{


  today: Date = new Date();
  currentYear: number = this.today.getFullYear();
  currentMonth: number = this.today.getMonth(); 
  currentDay: Number = this.today.getDate(); 
  endDate: Date = new Date('2022-04-01');
  dateValue: Object = new Date(new Date().setDate(14));
  minDate: Object = new Date(this.currentYear, this.currentMonth, 7);
  maxDate: Object =  new Date(this.currentYear, this.currentMonth, 27);
  dates$ = [];
    constructor() {}
    ngOnInit(): void {
        
    }

   enumerateDaysBetweenDates(startDate: any, endDate: any) {
      let dates$ = [];
      while(startDate.getTime() <= endDate.getTime()) {
          let initDate = new Date(startDate);
          dates$.push(initDate.getDay() + '/' + (initDate.getMonth() + 1) + '/' + initDate.getFullYear());       
          startDate.setTime(startDate.getTime() + 24*60*60*1000); // adding one day
      }
      return dates$;
  }
}