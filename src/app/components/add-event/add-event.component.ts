import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Guest } from 'src/app/models/event.model';
import { GuestService } from 'src/app/services/guest.service';
import { AddLocationComponent } from '../add-location/add-location.component';

@Component({
    selector: 'add-event-service-page',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss'],
})

export class AddEventComponent implements OnInit, OnDestroy {

    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

    myFilter = (d: Date | null): boolean => {
        const date = (d || new Date()).getDate();
        const now = new Date().getDate();
        return date >= now;
    };

    addEventForm: FormGroup;
    events;
    url:string = environment.apiUrl;
    sports;
    types;
    newEvent = {};
    aSub3: Subscription;
    aSub4: Subscription;
    aSub5: Subscription;
    guests;

    coords;
    isLocation = false;

    day;
    isDate = {
        isToday: false,
        isTomorrow: false,
        isCalendar: false
    }

    start = ''
    end = ''
    isTimeStart = {
        isNow: false,
        isTime: false
    }
    isTimeEnd = {
        isMidnight: false,
        isTime: false
    }

    sport = {
        id: 1,
        name: 'Волейбол',
    }
    type = {
        id: 1,
        name: 'Открытая игра'
    }

    isPrice = false
    event

    constructor(
        private http: HttpClient, 
        private datePipe: DatePipe, 
        private router: Router,
        private toastr: ToastrService,
        public dialog: MatDialog,
        public guestService: GuestService,
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<AddEventComponent>
    ) {
        this.addEventForm = new FormGroup({
            // sport: new FormControl('', Validators.required),
            // type: new FormControl('', Validators.required),
            date: new FormControl(''),
            time_start: new FormControl(''),
            time_end: new FormControl(''),
            price: new FormControl(0, Validators.pattern("^[0-9]+$"))
        });
    }

    ngOnInit() {
        this.getSports();
        this.getTypes();
    }

    openDialog() {
        this.dialog.open(DialogContentExampleDialog);
    }

    saveLocation() {
        this.dialog.open(AddLocationComponent, {
            data: {
                x: this.coords[0], 
                y: this.coords[1], 
                hintContent: 'Новая точка', 
                iconColor: 'orange'
            }
        });
    }

    getSports() {
        this.aSub3 = this.http.get(this.url + 'dict/sports/')
            .subscribe((res) => {
                this.sports = res;
        });
    }
    getTypes() {
        this.aSub4 = this.http.get(this.url + 'dict/events/types/')
            .subscribe((res) => {
                this.types = res;
        });
    }

    sendService(){
        this.guestService.currentGuests.subscribe((res) => {
            this.guests = res;

            let guestsId = []

            this.guests.forEach(guest => {
                guestsId.push(guest.id);
            });

            if(this.day == '') {
                this.day = this.datePipe.transform(this.addEventForm.value.date, 'yyyy-MM-dd')
            }

            if(this.start == '') {
                this.start = this.addEventForm.value.time_start
            }

            if(this.end == '') {
                this.end = this.addEventForm.value.time_end
            }
        
            this.newEvent = {
                sport: this.sport.id,
                type: this.type.id,
                time_start: (this.day + 'T' + this.start),
                time_end: (this.day + 'T' + this.end),
                location: this.data.id,
                price: this.addEventForm.value.price,
                guests: guestsId
            }
        })
        this.aSub5 = this.http.post(this.url + 'events/', this.newEvent)
        .subscribe(
            (res) => {
                this.event = res
                this.toastr.success('Событие создано!');
                this.dialogRef.close();
                this.router.navigateByUrl(`/event/${this.event.id}`)
            },
            error => {
                this.toastr.error(error.error.time_start);
            }
        )
    }

    setToday() {
        this.isDate = {
            isToday: true,
            isTomorrow: false,
            isCalendar: false
        }

        this.day = new Date()
        this. day = this.datePipe.transform(this.day, 'yyyy-MM-dd')
    }
    setTomorrow() {
        this.isDate = {
            isToday: false,
            isTomorrow: true,
            isCalendar: false
        }

        this.day = new Date()
        this.day.setDate(this.day.getDate() + 1)
        this.day = this.datePipe.transform(this.day, 'yyyy-MM-dd')
    }
    viewCalendar() {
        this.day = ''
        this.isDate = {
            isToday: false,
            isTomorrow: false,
            isCalendar: true
        }
    }

    setNow() {
        this.isTimeStart = {
            isNow: true,
            isTime: false
        }
        const now = new Date()
        this.start = now.getHours() + ':' + now.getMinutes()
    }
    viewTimeStart() {
        this.isTimeStart = {
            isNow: false,
            isTime: true
        }
        this.start = ''
    }
    setMidnight() {
        this.isTimeEnd = {
            isMidnight: true,
            isTime: false
        }
        this.end = '23:59'
    }
    viewTimeEnd() {
        this.isTimeEnd = {
            isMidnight: false,
            isTime: true
        }
        this.end = ''
    }

    closePrice() {
        this.isPrice = false
        this.addEventForm.controls['price'].setValue(0)
    }
    viewPrice() {
        this.isPrice = true
    }

    ngOnDestroy(){
        this.aSub3.unsubscribe();
        this.aSub4.unsubscribe();
        if(this.aSub5) {
            this.aSub5.unsubscribe();
        }
    }
}

@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: './dialog-content-example-dialog.html',
    styleUrls: ['./add-event.component.scss'],
})
export class DialogContentExampleDialog implements OnInit {

    options: Guest[];
    guests;
    url:string = environment.apiUrl;
    createGuestForm: FormGroup;
    myControl = new FormControl();
    filteredOptions: Observable<Guest[]>;
    guest: Guest;
    form: Guest = { } as Guest;
    baseGuests: Guest[] = [];
    guestsData;

    constructor(
        private http: HttpClient,
        public guestService: GuestService,
        private toastr: ToastrService
        ){
        this.createGuestForm = new FormGroup({
            id: new FormControl(''),
            name: new FormControl('', Validators.required),
            phone: new FormControl(''),
            email: new FormControl(''),
        })
    }

    ngOnInit() {
        this.getGuests();
        this.guestService.currentGuests.subscribe((res) => {
            this.guestsData = res;
        })
    }
    
    displayFn(user: Guest): string {
        return user && user.name ? user.name : '';
    }
    
    private _filter(name: string): Guest[] {
        const filterValue = name.toLowerCase();
    
        return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    getGuests() {
        this.http.get(this.url + 'guests/')
            .subscribe((res) => {
                this.guests = res;
                this.options = this.guests.results;
                this.filteredOptions = this.myControl.valueChanges.pipe(
                    startWith(''),
                    map(value => (typeof value === 'string' ? value : value.name)),
                    map(name => (name ? this._filter(name) : this.options.slice())),
                );
        });
    }

    saveGuest(option: Guest){
        this.guest = option;
        this.createGuestForm.patchValue({
            id: this.guest.id,
            name: this.guest.name,
            phone: this.guest.phone,
            email: this.guest.email
        })
    }

    constructForm(){
        this.form.id = this.createGuestForm.value.id;
        this.form.name = this.createGuestForm.value.name;
        this.form.phone = '+7' + this.createGuestForm.value.phone;
        this.form.email = this.createGuestForm.value.email;
    }

    createGuest() {
        if(this.createGuestForm.value.id == '' || this.createGuestForm.value.id == null){
            this.constructForm();
            this.http.post(this.url + 'guests/', this.form).subscribe(res => {
                this.getGuests();
                this.createGuestForm.reset();
                this.myControl.reset();
            });
        } else {
            this.http.patch(this.url + `guests/${this.createGuestForm.value.id}/`, this.createGuestForm.value).subscribe(res => {
                this.getGuests();
                this.createGuestForm.reset();
                this.myControl.reset();
            });
        }
    }

    addGuest() {
        if(!this.guestsData.includes(this.guest)){
            this.toastr.success('Гость успешно добавлен');
            this.guestService.changeGuests(this.guest);
            this.guestService.currentGuests.subscribe((res) => {
                this.guestsData = res;
            }) 
        } else {
            this.toastr.warning('Такой гость уже есть');
        }
        this.myControl.setValue('');
    }

}