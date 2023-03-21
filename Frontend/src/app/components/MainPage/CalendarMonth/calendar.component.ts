import { Component, OnInit } from '@angular/core';
import { getDay } from 'date-fns';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarMonthComponent implements OnInit{


  today: Date = new Date();
  currentYear: number = this.today.getFullYear();
  currentMonth: number = this.today.getMonth(); 
  currentDay: number = this.today.getDate(); 
  firstDay: Date = new Date(new Date().setDate(1))
  lastDay: Date = new Date(new Date().setDate(31));
  startDate: Object = new Date(this.currentYear, this.currentMonth, 1);
  endDate: Object =  new Date(this.currentYear, this.currentMonth, 31);

  items = []
  id= 0;
    constructor() {
        
    }

    ngOnInit(): void {
      this.id = setInterval((result :number) => {
        this.today = new Date(); 
      }, 1000);
    }

    nextDay() {
      return this.today.setDate(this.today.getDate() + 1)
    }
  
    dayBefore(){
      return this.today.setDate(this.today.getDate() - 1)
    }
  
    dayNow(){
      return this.today
    }

  Days() {
    let days: any = []
    let day = 0;
    for (let index = 1; index <= 31; index++) {
      day++
      days.push(day)
    }
    return days
  }

}