import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendarWeek.component.html',
  styleUrls: ['./calendarWeek.component.scss']
})

export class CalendarWeekComponent implements OnInit{

  today: Date = new Date();
  currentYear: number = this.today.getFullYear();
  currentMonth: number = this.today.getMonth(); 
  currentDay: number = this.today.getDate(); 
  firstDay: Date = new Date(new Date().setDate(1))
  lastDay: Date = new Date(new Date().setDate(31));
  startDate: Object = new Date(this.currentYear, this.currentMonth, 1);
  endDate: Object =  new Date(this.currentYear, this.currentMonth, 31);
  dates$ = [];
  id= 0;
    constructor() {}

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
    let day = 1;
    for (let index = 1; index <= 31; index++) {
      day++
      days.append(day)
    }
    return days
  }
}
