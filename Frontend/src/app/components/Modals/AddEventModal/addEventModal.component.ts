import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from 'src/app/components/Profile/profile.component';
import { AuthService } from 'src/app/Service/auth.service';
import { CustomValidators } from '../../CustomValidators/CustomValidator';
@Component({
  selector: 'app-addEventModal',
  templateUrl: './addEventModal.component.html',
  styleUrls: ['./addEventModal.component.scss']
})

export class addEventModalComponent implements OnInit {

  closeResult = '';
  alert: boolean = false;
  user: any

  date: string;

  today: Date = new Date();
  currentYear: number = this.today.getFullYear();
  currentMonth: number = this.today.getMonth();
  currentDay: number = this.today.getDate();
  firstDay: Date = new Date(new Date().setDate(1))
  lastDay: Date = new Date(new Date().setDate(31));
  startDate: Object = new Date(this.currentYear, this.currentMonth, 1);
  endDate: Object = new Date(this.currentYear, this.currentMonth, 31);


  constructor(private modalService: NgbModal, private authService: AuthService, private profileComponent: ProfileComponent) {
    this.date = new Date().toISOString().slice(0, 16);
  }

  ngOnInit(): void {

  }


  eventForm = new FormGroup({
    event: new FormControl('', [Validators.required, Validators.minLength(3)]),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required), 
    fullDay: new FormControl(''),
    category: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    address: new FormGroup({
      city: new FormControl('', Validators.pattern('[a-zA-Z]+$')),
      country: new FormControl('', Validators.pattern('[a-zA-Z]+$')),
      zip: new FormControl(''),
      street: new FormControl('',Validators.pattern('[a-zA-Z]+$')),
      houseNumber: new FormControl('',Validators.pattern('^[0-9]*$'))
    }),
    user: new FormGroup({
      id: new FormControl(localStorage.getItem('userId'))
    })
  },
    [CustomValidators.IsBiggerDateValidator('startTime', 'endTime')],
  )

  get event() {
    return this.eventForm.get('event')
  }

  get startTime() {
    return this.eventForm.get('startTime')
  }

  get endTime() {
    return this.eventForm.get('endTime')
  }

  get fullDay() {
    return this.eventForm.get('fullDay')
  }

  get dateValueError() {
    return this.eventForm.getError('badVal') &&
      this.eventForm.get('endTime')?.touched;
  }

  get category() {
    return this.eventForm.get('category')
  }

  get city() {
    return this.eventForm.get('city')
  }

  get country() {
    return this.eventForm.get('country')
  }

  get zip() {
    return this.eventForm.get('zip')
  }

  get street() {
    return this.eventForm.get('street')
  }

  get houseNumber() {
    return this.eventForm.get('houseNumber')
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'eventModal' }).result.then(
      (result) => {
        console.log(`closed with: ${result}`);
      },
      (reason) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`
    }
  }

  submitEvent() {
    this.authService.registerEvent(this.eventForm.value)
      .subscribe({
        next: () => {
          console.warn("Event data =>", this.eventForm.value)
          this.alert = true;
          this.eventForm.reset({})
          location.reload()
        },
        error: (error) => console.log('Error =>', error)
      })
  }

  closeAlert() {
    this.alert = false
  }
}
