import { Component, OnDestroy, OnInit, AfterViewInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { YaEvent } from 'angular8-yandex-maps';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddEventComponent } from '../add-event/add-event.component';
import { AddLocationComponent } from '../add-location/add-location.component';

@Component({
    selector: 'events-service-page',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})

export class EventsComponent implements OnInit, AfterViewInit, OnDestroy {

    locations;
    events;
    url:string = environment.apiUrl;
    aSub: Subscription;
    aSub2: Subscription;
    spinner: boolean;
    places = [
        {x: 45.04, y: 41.95, hintContent: 'Точка 1', iconColor: 'red'},
        {x: 45.05, y: 41.95, hintContent: 'Точка 2', iconColor: 'green'},
        {x: 45.06, y: 41.95, hintContent: 'Точка 3', iconColor: 'blue'},
    ]

    coords;
    isLocation = false;

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
    ) {}
    
    ngOnInit(): void {
        this.spinner = true;
        this.getEvents();
        this.getLocations();
    }

    ngAfterViewInit(): void {
        this.spinner = false;
    }

    saveLocation() {
        const dialogRef = this.dialog.open(AddLocationComponent, {
            data: {
                x: this.coords[0], 
                y: this.coords[1], 
                hintContent: 'Новая точка', 
                iconColor: 'orange'
            }
        });
    
        dialogRef.afterClosed().subscribe(() => {
            this.getLocations()
        });
    }

    openDialog(id) {
        const dialogRef = this.dialog.open(DialogEventsComponent, {
            data: {
              id: id,
            },
          });
        this.filterLocation(id)
    
        dialogRef.afterClosed().subscribe(() => {
            this.getEvents()
        })
    }

    getEvents() {
        this.aSub = this.http.get(this.url + 'events/group-by-date?multi_status=1,2,3')
            .subscribe((res) => {
                this.events = res;
        });
    }

    getLocations() {
        this.aSub2 = this.http.get(this.url + 'locations/')
            .subscribe((res) => {
                this.locations = res;
        });
    }

    filterLocation(id): void {
        this.aSub = this.http.get(this.url + `events/group-by-date?multi_status=1%2C2%2C3&location=${id}`)
            .subscribe((res) => {
                this.events = res;
        });
    }

    onMapClick(e: YaEvent<ymaps.Map>): void {
        const { target, event } = e;
    
        if (!target.balloon.isOpen()) {
            this.isLocation = true;
            const coords = event.get('coords');

            target.balloon.open(coords, {
                contentHeader: 'Новое место!',
                contentBody:
                    '<p>Координаты: ' +
                    [coords[0].toPrecision(6), coords[1].toPrecision(6)].join(', ') +
                    '</p>', 
            }, {closeButton: false});
            this.coords = coords;
        } else {
            this.isLocation = false;
            target.balloon.close();
        }
    }

    ngOnDestroy(){
        this.aSub.unsubscribe();
        this.aSub2.unsubscribe();
    }
}

@Component({
    selector: 'dialog-events',
    templateUrl: './dialog-events.component.html',
    styleUrls: ['./events.component.scss'],
})
export class DialogEventsComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data
    ){ }
    ngOnInit() { }

    openDialog(id) {
        this.dialog.open(AddEventComponent, {
            data: {
              id: id,
            },
        });
    }
}