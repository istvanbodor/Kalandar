import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs';
import { ProfileComponent } from 'src/app/components/Profile/profile.component';
import { AuthService } from 'src/app/Service/auth.service';
import { CustomValidators } from '../../../CustomValidators/CustomValidator';

@Component({
  selector: 'app-events-modal',
  templateUrl: './eventsModal.component.html',
  styleUrls: ['./eventsModal.component.scss']
})
export class EventsModalComponent {

  closeResult = '';
  alert: boolean = false;
  date: string;
  events$: any
  events: any

  constructor(private modalService: NgbModal, private authService: AuthService, private profileComponent: ProfileComponent) {
    this.date = new Date().toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    //All users
    // this.events$ = this.authService.getAllEvents().pipe(tap((result) => this.events = result ))
    console.log('Value type =>', (this.profileComponent.userId()))
    this.authService.getProfile().subscribe((user) =>{
      this.events$ = this.authService.getUserEvents(String(user.id)).pipe(tap((result) => {
        this.events = result
        console.log(this.events)
      }))
    })
  }
  today: Date = new Date();
  currentYear: number = this.today.getFullYear();
  currentMonth: number = this.today.getMonth();
  currentDay: number = this.today.getDate();
  firstDay: Date = new Date(new Date().setDate(1))
  lastDay: Date = new Date(new Date().setDate(31));
  startDate: Object = new Date(this.currentYear, this.currentMonth, 1);
  endDate: Object = new Date(this.currentYear, this.currentMonth, 31);

  eventForm = new FormGroup({
    event: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl(''),
    fullDay: new FormControl(''),
    category: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    address: new FormGroup({
      city: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      country: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      zip: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]*$')]),
      street: new FormControl('', [Validators.required]),
      houseNumber: new FormControl('', [Validators.required]),
    }),
    user: new FormGroup({
      id: new FormControl(1)
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
    console.log(this.eventForm.value)
    this.authService.registerEvent(this.eventForm.value)
      .subscribe({
        next: (result) => {
          console.warn("Event data =>", result)
          this.alert = true;
          this.eventForm.reset({})
        },
        error: (error) => console.log('Error =>', error)
      })
  }

  closeAlert() {
    this.alert = false
  }

  DeleteEvent(id: string) {
    this.authService.deleteEvent(id)
      .subscribe({
        next: () => {
          this.authService.getProfile()
            .subscribe({
              next: (user) => {
                this.events$ = this.authService
                  .getUserEvents(String(user.id)).pipe()
              },
              error: (error) => {
                console.log('user events error => ', error)
              }
            })
        }
      })
  }

  days() {
    const Days = []

    const numDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    for (let day = 1; day <= numDays; day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      const dayOfMonth = date.getDate();
      Days.push([dayOfMonth])

    }
    return Days
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