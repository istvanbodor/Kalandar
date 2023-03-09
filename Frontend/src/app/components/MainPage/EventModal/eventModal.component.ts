import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidators } from '../../CustomValidators/CustomValidator';


@Component({
  selector: 'app-eventModal',
  templateUrl: './EventModal.component.html',
  styleUrls: ['./eventModal.component.css']
})

export class EventModalComponent implements OnInit{
  
  closeResult = '';
  alert: boolean = false;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {

  }

  eventForm = new FormGroup({
    title: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z]+$')]),
    start_time: new FormControl('', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
    end_time: new FormControl('', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)])
  },
  [CustomValidators.IsBiggerDateValidator('start_time', 'end_time')]
  )

  get title(){
    return this.eventForm.get('title')
  }

  get start_time(){
    return this.eventForm.get('start_time')
  }

  get end_time(){
    return this.eventForm.get('end_time')
  }

  get dateValueError(){
    return this.eventForm.getError('badVal') &&
    this.eventForm.get('end_date')?.touched;
  }

 submitEvent(){
  console.log(this.eventForm.value)
  this.alert = true;
  this.eventForm.reset({})
 }

  open(content : any){
    this.modalService.open(content, {ariaLabelledBy: 'eventModal'}).result.then(
    // (result) => {
    //   this.closeResult = `closed with: ${result}`;
    // },
    // (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}` 
    // }
    );
  }

  // private getDismissReason(reason: any): string {
  //   if(reason === ModalDismissReasons.ESC) {
  //       return 'by pressing ESC';
  //   }else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return'by clicking on a backdrop';
  //   }else {
  //     return `with: ${reason}`
  //   }
  // }
}
