import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'history-service-page',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})

export class HistoryComponent implements OnInit {

    events;
    url:string = environment.apiUrl;

    constructor(private http: HttpClient) {}
    
    ngOnInit() {
        this.getEvents();
    }

    getEvents() {
        return this.http.get(this.url + `events?multi_status=${encodeURIComponent('4,5')}`)
            .subscribe((res) => {
                this.events = res;
        });
    }
    closeEvents() {
        return this.http.get(this.url + `events?multi_status=4`)
            .subscribe((res) => {
                this.events = res;
        });
    }
    cancelEvents() {
        return this.http.get(this.url + `events?multi_status=5`)
            .subscribe((res) => {
                this.events = res;
        });
    }
}