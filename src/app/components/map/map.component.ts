import { Component, OnDestroy, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { YaEvent, YaReadyEvent } from 'angular8-yandex-maps';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';
import { AddLocationComponent } from '../add-location/add-location.component';

@Component({
    selector: 'map-service-page',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit, OnDestroy {

    locations;
    placemarks = [];
    url:string = environment.apiUrl;
    aSub: Subscription;

    coords;
    isLocation = false;

    map: ymaps.Map;

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}
    
    ngOnInit(): void {
        // this.getLocations();
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
            this.aSub = this.getLocations().subscribe((res) => {
                this.locations = res;
            });
        });
    }

    onMapReady(event: YaReadyEvent<ymaps.Map>): void {
        this.aSub = this.getLocations().subscribe((res) => {
            this.locations = res;
            this.setPlacemarks(event)
        });
    }

    setPlacemarks(event) {
        this.map = event.target;

        let clearCoord = []

        this.locations.results.forEach((location) => {
            if(location.lat && location.lon) {
                clearCoord.push([location.lat, location.lon])

                this.placemarks.push({
                    geometry: [location.lat, location.lon],
                    properties: {
                        hintContent: location.name,
                    },
                    options: {
                        preset: location.confirmed? 'islands#blueCircleDotIcon' : 'islands#grayCircleDotIcon',
                    },
                    location: location
                });
            }
        });

        this.map.setBounds(ymaps.util.bounds.fromPoints(clearCoord), {
            checkZoomRange: true,
            zoomMargin: [20]
        })
    }


    openDialog(location) {
        this.dialog.open(DialogEventsComponent, {
            data: {
                location: location,
            },
        });
    }

    getLocations() {
        return this.http.get(this.url + 'locations/')
            
    }

    onMapClick(e: YaEvent<ymaps.Map>): void {
        const { target, event } = e;
    
        if (!target.balloon.isOpen()) {
            this.isLocation = true;
            const coords = event.get('coords');

            target.balloon.open(coords, {
                contentHeader: 'Новое место!'
            }, {closeButton: false});
            this.coords = coords;
        } else {
            this.isLocation = false;
            target.balloon.close();
        }
    }

    ngOnDestroy(){
        this.aSub.unsubscribe();
    }
}

@Component({
    selector: 'dialog-events',
    templateUrl: './dialog-events.component.html',
    styleUrls: ['./map.component.scss'],
})
export class DialogEventsComponent implements OnInit, OnDestroy {
    aSub: Subscription
    events
    url:string = environment.apiUrl;

    constructor(
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data,
        private http: HttpClient,
        public dialogRef: MatDialogRef<DialogEventsComponent>
    ){ }
    ngOnInit() {
        this.getEvents(this.data.location.id)
    }

    openDialog(id) {
        this.dialog.open(AddEventComponent, {
            data: {
              id: id,
            },
        });
    }

    getEvents(id): void {
        this.aSub = this.http.get(this.url + `events/group-by-date?multi_status=1%2C2%2C3&location=${id}`)
            .subscribe((res) => {
                this.events = res;
        });
    }

    isEvent(e) {
        if(e) {
            this.dialogRef.close()
        }
    }

    ngOnDestroy(): void {
        this.aSub.unsubscribe()
    }
}