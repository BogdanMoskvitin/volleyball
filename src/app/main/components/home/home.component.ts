import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { YaEvent } from 'angular8-yandex-maps';

@Component({
    selector: 'home-service-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

    events;
    url:string = environment.apiUrl;
    aSub: Subscription;
    spinner: boolean;
    places = [
        {x: 45.04, y: 41.95, hintContent: 'Точка 1', iconColor: 'red'},
        {x: 45.05, y: 41.95, hintContent: 'Точка 2', iconColor: 'green'},
        {x: 45.06, y: 41.95, hintContent: 'Точка 3', iconColor: 'blue'},
    ]

    coords;
    isLocation = false;

    constructor(private http: HttpClient) {}
    
    ngOnInit(): void {
        this.spinner = true;
        this.getEvents();
    }

    ngAfterViewInit(): void {
        this.spinner = false;
    }

    getEvents() {
        this.aSub = this.http.get(this.url + 'main/')
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

    saveLocation(){
        console.log({x: this.coords[0], y: this.coords[1], hintContent: 'Новая точка', iconColor: 'orange'})
        this.places.push({x: this.coords[0], y: this.coords[1], hintContent: 'Новая точка', iconColor: 'orange'})
    }

    ngOnDestroy(){
        this.aSub.unsubscribe();
    }
}