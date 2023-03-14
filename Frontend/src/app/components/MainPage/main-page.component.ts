import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
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
