import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Service/auth.service';
import { CustomValidators } from '../../CustomValidators/CustomValidator';
@Component({
  selector: 'app-eventModal',
  templateUrl: './EventModal.component.html',
  styleUrls: ['./eventModal.component.css']
})

export class EventModalComponent implements OnInit{

  closeResult = '';
  alert: boolean = false;

  date: string;


  constructor(private modalService: NgbModal, private authService: AuthService) {
    this.date = new Date().toISOString().slice(0, 16);
  }

  ngOnInit(): void {

  }


  eventForm = new FormGroup({
    event: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    startTime: new FormControl('',Validators.required),
    endTime: new FormControl(''),
    fullDay: new FormControl(''),
    category: new FormControl('', [ Validators.pattern('[a-zA-Z]+$')]),
    // address: new FormGroup({
    //   city: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    // }),
  },
  [CustomValidators.IsBiggerDateValidator('startTime', 'endTime')]
  )

  get event(){
    return this.eventForm.get('event')
  }

  get startTime(){
    return this.eventForm.get('startTime')
  }

  get endTime(){
    return this.eventForm.get('endTime')
  }

  get fullDay(){
    return this.eventForm.get('fullDay')
  }

  get dateValueError(){
    return this.eventForm.getError('badVal') &&
    this.eventForm.get('endTime')?.touched;
  }

  get category() {
    return this.eventForm.get('category')
  }

  open(content : any){
    this.modalService.open(content, {ariaLabelledBy: 'eventModal'}).result.then(
    (result) => {
      console.log(`closed with: ${result}`);
    },
    (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    }
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

  submitEvent(){
  console.log(this.eventForm.value)
  this.authService.registerEvent(this.eventForm.value)
  .subscribe((result) => {
    console.warn("Event data =>",result)
    this.alert = true;
    this.eventForm.reset({})
  })
 }

 closeAlert(){
  this.alert = false
  }

}
