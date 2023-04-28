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

export class UpdateEventModalComponent implements OnInit {

    closeResult = '';
    event$: any
    user: any

    constructor(private modalService: NgbModal, private authService: AuthService, private location: Location) {}

    eventForm = new FormGroup({
        event: new FormControl('', Validators.minLength(3)),
        startTime: new FormControl(''),
        endTime: new FormControl(''),
        fullDay: new FormControl(''),
        category: new FormControl('', [Validators.pattern('[a-zA-Z]+$')]),
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

    ngOnInit(): void {

    }

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

    openModal(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'updateEventModal' })}

    updateEvent() {
        this.authService.updateEvent(String(localStorage.getItem('eventId')), this.eventForm.value)
        localStorage.removeItem('eventId')
        location.reload()
    }
}
