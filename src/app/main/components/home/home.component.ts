import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'home-service-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

    events;
    url:string = environment.apiUrl;

    constructor(private http: HttpClient) {}
    
    ngOnInit() {
        this.getEvents();
    }

    getEvents() {
        return this.http.get(this.url + `events?multi_status=${encodeURIComponent('1,2,3')}`)
            .subscribe((res) => {
                this.events = res;
        });
    }
}