import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getDate, nextDay } from 'date-fns';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{
  
  closeResult = '';


constructor() {

}
  
  today: Date = new Date();
  today2: Date = new Date(this.today);
  // currentDate = this.today.setDate(this.today.getDate())
  tomorrow = this.today.setDate(this.today.getDate() + 1)

  currentYear: number = this.today.getFullYear();
  currentMonth: number = this.today.getMonth(); 
  currentDay = this.today.getDate(); 
  dateValue: Object = new Date(new Date().setDate(14));
  startDate: Object = new Date(this.currentYear, this.currentMonth, 1);
  endDate: Object =  new Date(this.currentYear, this.currentMonth, 31);
  id = 0; 


  
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

}
