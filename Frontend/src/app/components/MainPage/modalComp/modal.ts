import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.css']
})

export class ModalComponent implements OnInit{
  
  closeResult = '';
  
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {

  }

  open(content : any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
    // (result) => {
    //   this.closeResult = `closed with: ${result}`;
    // },
    // (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}` 
    // }
    );
  }

  private getDismissReason(reason: any): string {
    if(reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    }else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return'by clicking on a backdrop';
    }else {
      return `with: ${reason}`
    }
  }
}
