import { Component, OnDestroy, OnInit, AfterViewInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { YaEvent, YaReadyEvent } from 'angular8-yandex-maps';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';
import { AddLocationComponent } from '../add-location/add-location.component';
// import { Router } from '@angular/router';

@Component({
    selector: 'events-service-page',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})

export class EventsComponent implements OnInit, AfterViewInit, OnDestroy {

    locations;
    placemarks = [];
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

    // clustererOptions: ymaps.IClustererOptions = {
    //     gridSize: 32,
    //     clusterDisableClickZoom: true,
    //     preset: 'islands#greenClusterIcons',

    //     groupByCoordinates: false,

    //     clusterHideIconOnBalloonOpen: false,
    //     geoObjectHideIconOnBalloonOpen: false,
    // };

    map: ymaps.Map;
    // balloon

    constructor(
        private http: HttpClient,
        // private router: Router,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data
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

    onMapReady(event: YaReadyEvent<ymaps.Map>): void {
        this.map = event.target;

        let clearCoord = []

        this.locations.results.forEach((location) => {
            if(location.lat && location.lon) {
                clearCoord.push([location.lat, location.lon])

                this.placemarks.push({
                geometry: [location.lat, location.lon],
                properties: {
                    hintContent: location.name,
                    // balloonContent: `
                    //     <button 
                    //         style="background: #2196F3; color: #fff; border-radius: 4px; border: none; padding: 0 16px; line-height: 36px; display: block; width: 160px; margin-top: 20px; cursor: pointer;"
                    //         class="btn-add" id="${location.id}"
                    //     >
                    //         Добавить событие ${location.id}
                    //     </button>
                    //     <button 
                    //         style="background: #2196F3; color: #fff; border-radius: 4px; border: none; padding: 0 16px; line-height: 36px; display: block; width: 160px; margin-top: 5px; cursor: pointer;"
                    //         class="btn-router" id="${location.id}"
                    //     >
                    //         Об организации ${location.id}
                    //     </button>
                    // `,
                    // clusterCaption: `placemark <strong>${location.id}</strong>`,
                    // id: location.id
                },
                options: {
                    preset: 'islands#greenDotIcon',
                },
                id: location.id,
                });
            }
        });

        this.map.setBounds(ymaps.util.bounds.fromPoints(clearCoord), {
            checkZoomRange: true,
            zoomMargin: [20]
        })

        // this.map.balloon.events.add('open', function (event) {
        //     let btnAdd = document.getElementsByClassName('btn-add')
        //     let btnRouter = document.getElementsByClassName('btn-router')
        //     setTimeout(() => {
        //         // btnAdd[0].addEventListener('click', (e) => {
        //         //     console.log('btnAdd', (e.target as HTMLButtonElement).id)
        //         //     // this.dialog.open(AddEventComponent, {
        //         //     //     data: {
        //         //     //       id: (e.target as HTMLButtonElement).id,
        //         //     //     },
        //         //     // });
        //         //     this.openDialog()
        //         // })
        //         btnAdd[0].addEventListener('click', (e) => this.openDialog)
        //         btnRouter[0].addEventListener('click', (e) => {
        //             console.log('btnRouter', (e.target as HTMLButtonElement).id)
        //             // this.router.navigate("['../location', (e.target as HTMLButtonElement).id]")
        //         })
        //     }, 100)
        // });

        // this.map.balloon.events.add('click', function (event) {
        //     let btnAdd = document.getElementsByClassName('btn-add')
        //     let btnRouter = document.getElementsByClassName('btn-router')
        //     setTimeout(() => {
        //         // btnAdd[0].addEventListener('click', (e) => {
        //         //     console.log('btnAdd', (e.target as HTMLButtonElement).id)
        //         //     // this.dialog.open(AddEventComponent, {
        //         //     //     data: {
        //         //     //       id: (e.target as HTMLButtonElement).id,
        //         //     //     },
        //         //     // });
        //         //     this.openDialog()
        //         // })
        //         btnAdd[0].addEventListener('click', (e) => this.openDialog())
        //         btnRouter[0].addEventListener('click', (e) => {
        //             console.log('btnRouter', (e.target as HTMLButtonElement).id)
        //             // this.router.navigate("['../location', (e.target as HTMLButtonElement).id]")
        //         })
        //     }, 100)
        // });
    }

    // onClustererReady(event: YaReadyEvent<ymaps.Clusterer>): void {
    //     const clusterer = event.target;

    //     clusterer.options.set({
    //       gridSize: 100,
    //       clusterDisableClickZoom: true,
    //     });

    //     this.map.setBounds(clusterer.getBounds(), {
    //       checkZoomRange: true,
    //     });
    // }

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