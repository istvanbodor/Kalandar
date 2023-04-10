import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { pipe, tap } from 'rxjs';
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

  storeEventId(id: string){
    return localStorage.setItem('eventId',id)
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
