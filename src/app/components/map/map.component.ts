import { Component, OnDestroy, OnInit, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { YaEvent, YaReadyEvent } from 'angular8-yandex-maps';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';
import { AddLocationComponent } from '../add-location/add-location.component';
import { MyData } from 'src/app/services/my-data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
    selector: 'map-service-page',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnChanges, OnInit {

    @Input() locations

    placemarks = [];
    url:string = environment.apiUrl;
    coords;
    map: ymaps.Map;
    center
    zoom = 12
    mydata
    isAuth: boolean;
    isDarkTheme = false;

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data,
        private myData: MyData,
        private authService: AuthService,
        private router: Router,
        private themeService: ThemeService
    ) {
        themeService.isDarkTheme.subscribe(res => {
            this.isDarkTheme = res
            if(this.isDarkTheme) {
                
            }
        })
    }

    ngOnInit(): void {
        if(this.authService.getToken() == null) {
            this.isAuth = false;
        } else {
            this.isAuth = true;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if(this.map != undefined) {
            this.map.geoObjects.removeAll()
        
            let clearCoord = []

            if(this.locations.length) {
                this.locations.forEach((location) => {
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
            } else {
                this.myData.currentData.subscribe((res) => {
                    this.mydata = res
                    this.center = [this.mydata.city.lat, this.mydata.city.lon]
                })
            }  
        }
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

    onMapReady(event: YaReadyEvent<ymaps.Map>): void {
        this.setPlacemarks(event)
    }

    setPlacemarks(event) {
        this.map = event.target;

        let clearCoord = []
        if(this.locations.length) {
            this.locations.forEach((location) => {
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
        } else {
            this.myData.currentData.subscribe((res) => {
                this.mydata = res
                this.center = [this.mydata.city.lat, this.mydata.city.lon]
            })
        }  
    }


    openDialog(location) {
        this.dialog.open(DialogEventsComponent, {
            data: {
                location: location,
            },
        });
    }

    onMapClick(e: YaEvent<ymaps.Map>): void {
        if(this.isAuth) {
            this.coords = e.event.get('coords');
            this.saveLocation()
        } else {
            this.router.navigate(['./login'])
        }
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
    isAuth: boolean;

    constructor(
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data,
        private http: HttpClient,
        public dialogRef: MatDialogRef<DialogEventsComponent>,
        private authService: AuthService
    ){ }
    ngOnInit() {
        if(this.authService.getToken() == null) {
            this.isAuth = false;
        } else {
            this.isAuth = true;
        }
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