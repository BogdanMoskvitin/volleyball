import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'home-service-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

    events;
    url:string = 'https://api.dev.freeteamcollaboration.ru/';

    constructor(private http: HttpClient) {}
    
    ngOnInit() {
        this.getEvents();
    }

    getEvents() {
        return this.http.get(this.url + 'events')
            .subscribe((res) => {
                this.events = res;
        });
    }
}