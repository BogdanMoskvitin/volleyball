import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

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
    kinds;
    types;

    constructor(
        private http: HttpClient, 
        private datePipe: DatePipe, 
        private router: Router,
        private toastr: ToastrService) {
        this.addEventForm = new FormGroup({
            kind: new FormControl('', Validators.required),
            type: new FormControl('', Validators.required),
            date: new FormControl('', Validators.required),
            time: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
            price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")])
        });
    }

    ngOnInit() {
        this.getEvents();
        this.getLocations();
        this.getKinds();
        this.getTypes();
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
            kind: this.addEventForm.value.kind,
            type: this.addEventForm.value.type,
            time_start: (this.datePipe.transform(this.addEventForm.value.date, 'yyyy-MM-dd') + 'T' + this.addEventForm.value.time),
            location: this.addEventForm.value.location,
            price: this.addEventForm.value.price,
        }
        return this.http.post(this.url + 'events/', this.newEvent).subscribe(
            (res) => {
                this.toastr.success('Событие создано!');
                this.router.navigateByUrl('main/header/home');
            },
            error => {
                this.toastr.error('Ошибка создания события');
            });
    }

    getLocations() {
        return this.http.get(this.url + 'locations/')
            .subscribe((res) => {
                this.locations = res;
        });
    }

    getKinds() {
        return this.http.get(this.url + 'kinds/')
            .subscribe((res) => {
                this.kinds = res;
        });
    }
    getTypes() {
        return this.http.get(this.url + 'types/')
            .subscribe((res) => {
                this.types = res;
        });
    }
}