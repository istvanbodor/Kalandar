import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { tap } from "rxjs";
import { CustomValidators } from "src/app/components/CustomValidators/CustomValidator";
import { AuthService } from "src/app/Service/auth.service";

@Component({
    selector: 'app-updateEventsModal',
    templateUrl: './updateEventModal.component.html',
    styleUrls: ['./updateEventModal.component.css']
})

export class UpdateEventModalComponent{

    closeResult = '';
    events$: any
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

    constructor(private modalService: NgbModal, private authService: AuthService, private location: Location) {
        this.date = new Date().toISOString().slice(0, 16);
    }
    eventForm = new FormGroup({
        event: new FormControl('', Validators.minLength(3)),
        startTime: new FormControl(''),
        endTime: new FormControl(''),
        fullDay: new FormControl(''),
        category: new FormControl('', [ Validators.pattern('[a-zA-Z]+$')]),
        address: new FormGroup({
          city: new FormControl('',Validators.pattern('[a-zA-Z]+$')),
          country: new FormControl('',Validators.pattern('[a-zA-Z]+$')),
          zip: new FormControl(''),
          street: new FormControl(''),
          houseNumber: new FormControl(''),
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
            localStorage.removeItem('eventId')
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            localStorage.removeItem('eventId')
            return 'by clicking on a backdrop';
        } else {
            localStorage.removeItem('eventId')
            return `with: ${reason}`
        }
    }

    submitEvent() {
        this.authService.updateEvent(String(localStorage.getItem('eventId')) , this.eventForm.value)
        localStorage.removeItem('eventId')
        location.reload()
        // .subscribe({
        //     next: (user: any) => {
        //       this.events$ = this.authService
        //         .getUserEvents(String(user.id)).pipe(tap((result) => {
        //           // this.events = result
        //           // console.log(this.events)
        //         }))
        //     },
        //     error: (error: any) => {
        //       console.log('user events error => ', error)
        //     }
        //   })

            // .subscribe({
            //     next: () => {
            //         console.warn("Update event data =>", this.eventForm.value)
            //         this.eventForm.reset({})
            //         localStorage.removeItem('eventId')
            //     },
            //     error: (error) => console.log('Error =>', error)
            // })
    }
}
