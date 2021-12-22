import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyData } from 'src/app/my-data.service';

@Component({
    selector: 'home-service-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

    events;
    mydata;
    url:string = 'https://api.dev.freeteamcollaboration.ru/';

    constructor(private http: HttpClient, private myData: MyData) {}
    
    ngOnInit() {
        this.getEvents();
        this.myData.currentData.subscribe(
            (res) => {
                this.mydata = res;
            }
        );
    }

    getEvents() {
        return this.http.get(this.url + 'events')
            .subscribe((res) => {
                this.events = res;
        });
    }
}