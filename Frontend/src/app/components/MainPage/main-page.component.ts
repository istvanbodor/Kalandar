import { Component, OnInit } from '@angular/core';
import { startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours, } from 'date-fns';
import { CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView, } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

const colors: Record <string, EventColor> = {
    
}


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  
  closeResult = '';
  currentDate = new Date();
  id = 0; 

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.id = setInterval((result :number) => {
      this.currentDate = new Date(); 
    }, 1000);
  }

}
