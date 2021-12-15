import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'add-event-service-page',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss'],
})

export class AddEventComponent implements OnInit {

    addEventForm : FormGroup;

    constructor() {
        this.addEventForm = new FormGroup({
            id: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
            time: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
            price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")])
        });
    }

    ngOnInit() {}
    sendService(){
        console.log(this.addEventForm.value);
    }
}