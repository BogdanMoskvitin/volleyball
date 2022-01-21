import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'add-event-service-page',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss'],
})

export class AddEventComponent implements OnInit {

    addEventForm: FormGroup;
    events;
    locations;
    url:string = environment.apiUrl;

    constructor(
        private http: HttpClient, 
        private datePipe: DatePipe, 
        private router: Router) {
        this.addEventForm = new FormGroup({
            date: new FormControl('', Validators.required),
            time: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
            price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")])
        });
    }

    ngOnInit() {
        this.getEvents();
        this.getLocations();
    }

    getEvents() {
        return this.http.get(this.url + 'events/')
            .subscribe((res) => {
                this.events = res;
        });
    }

    newEvent = {};

    sendService(){
        this.newEvent = {
            time_start: (this.datePipe.transform(this.addEventForm.value.date, 'yyyy-MM-dd') + 'T' + this.addEventForm.value.time),
            location: this.addEventForm.value.location,
            price: this.addEventForm.value.price
        }
        return this.http.post(this.url + 'events/', this.newEvent)
            .subscribe((res) => {
                this.router.navigateByUrl('main/header/home');
        });
    }

    getLocations() {
        return this.http.get(this.url + 'locations/')
            .subscribe((res) => {
                this.locations = res;
        });
    }
}