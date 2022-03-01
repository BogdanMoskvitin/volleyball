import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
    selector: 'history-service-page',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})

export class HistoryComponent implements OnInit, OnDestroy {

    events;
    url:string = environment.apiUrl;
    aSub1: Subscription;
    aSub2: Subscription;
    aSub3: Subscription;

    constructor(private http: HttpClient) {}
    
    ngOnInit() {
        this.getEvents();
    }

    getEvents() {
        this.aSub1 = this.http.get(this.url + `events/all?multi_status=${encodeURIComponent('4,5')}`)
            .subscribe((res) => {
                this.events = res;
        });
    }
    closeEvents() {
        this.aSub2 = this.http.get(this.url + `events/all?multi_status=4`)
            .subscribe((res) => {
                this.events = res;
        });
    }
    cancelEvents() {
        this.aSub3 = this.http.get(this.url + `events/all?multi_status=5`)
            .subscribe((res) => {
                this.events = res;
        });
    }

    ngOnDestroy(){
        this.aSub1.unsubscribe();
        if(this.aSub2){
            this.aSub2.unsubscribe();
        }
        if(this.aSub2){
            this.aSub2.unsubscribe();
        }
    }
}