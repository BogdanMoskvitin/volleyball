import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
    selector: 'add-event-service-page',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss'],
})

export class AddEventComponent implements OnInit, OnDestroy {

    addEventForm: FormGroup;
    events;
    locations;
    url:string = environment.apiUrl;
    kinds;
    types;
    newEvent = {};
    aSub2: Subscription;
    aSub3: Subscription;
    aSub4: Subscription;
    aSub5: Subscription;

    constructor(
        private http: HttpClient, 
        private datePipe: DatePipe, 
        private router: Router,
        private toastr: ToastrService) {
        this.addEventForm = new FormGroup({
            kind: new FormControl('', Validators.required),
            type: new FormControl('', Validators.required),
            date: new FormControl('', Validators.required),
            time_start: new FormControl('', Validators.required),
            time_end: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
            price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")])
        });
    }

    ngOnInit() {
        this.getLocations();
        this.getKinds();
        this.getTypes();
    }

    getLocations() {
        this.aSub2 = this.http.get(this.url + 'locations/all/')
            .subscribe((res) => {
                this.locations = res;
        });
    }

    getKinds() {
        this.aSub3 = this.http.get(this.url + 'sports/all/')
            .subscribe((res) => {
                this.kinds = res;
        });
    }
    getTypes() {
        this.aSub4 = this.http.get(this.url + 'events/types/')
            .subscribe((res) => {
                this.types = res;
        });
    }

    sendService(){
        this.newEvent = {
            kind: this.addEventForm.value.kind,
            type: this.addEventForm.value.type,
            time_start: (this.datePipe.transform(this.addEventForm.value.date, 'yyyy-MM-dd') + 'T' + this.addEventForm.value.time_start),
            time_end: (this.datePipe.transform(this.addEventForm.value.date, 'yyyy-MM-dd') + 'T' + this.addEventForm.value.time_end),
            location: this.addEventForm.value.location,
            price: this.addEventForm.value.price,
        }
        this.aSub5 = this.http.post(this.url + 'events/all/', this.newEvent).subscribe(
            (res) => {
                this.toastr.success('Событие создано!');
                this.router.navigateByUrl('main/header/home');
            },
            error => {
                this.toastr.error(error.error.time_start);
            });
    }

    ngOnDestroy(){
        this.aSub2.unsubscribe();
        this.aSub3.unsubscribe();
        this.aSub4.unsubscribe();
        if(this.aSub5) {
            this.aSub5.unsubscribe();
        }
    }
}