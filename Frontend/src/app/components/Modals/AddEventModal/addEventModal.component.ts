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
  user: any

  constructor(private modalService: NgbModal, private authService: AuthService, private profileComponent: ProfileComponent) {}

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
    this.modalService.open(content, { ariaLabelledBy: 'addEventModal' })}

  submitEvent() {
    this.authService.registerEvent(this.eventForm.value)
      .subscribe({
        next: () => {
          this.eventForm.reset({})
          location.reload()
        },
        error: (error) => console.log('Error =>', error)
      })
  }
}
