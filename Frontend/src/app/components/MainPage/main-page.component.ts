import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  
  currentDate = new Date();
  id = 0; 

  constructor() {}

  ngOnInit(): void {
    this.id = setInterval((result :number) => {
      this.currentDate = new Date(); 
    }, 1000);
  }

  
}
