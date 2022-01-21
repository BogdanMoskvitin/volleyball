import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'history-service-page',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})

export class HistoryComponent implements OnInit {

    events;
    time_start;
    url:string = 'https://api.dev.freeteamcollaboration.ru/';
    now;
    currentEvents = [];

    constructor(private http: HttpClient) {}
    
    ngOnInit() {
        this.now = new Date();
        this.getEvents();
    }

    getEvents() {
        return this.http.get(this.url + 'events/')
            .subscribe((res) => {
                this.events = res;
                this.events.results.forEach(key => {
                    if(key.time_start < this.now.toISOString()){
                        this.currentEvents.push(key);
                    }
                })
        });
    }
}