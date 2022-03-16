import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
    selector: 'home-service-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {

    events;
    url:string = environment.apiUrl;
    aSub: Subscription;

    constructor(private http: HttpClient) {}
    
    ngOnInit() {
        this.getEvents();
    }

    getEvents() {
        this.aSub = this.http.get(this.url + 'main/')
            .subscribe((res) => {
                this.events = res;
        });
    }

    ngOnDestroy(){
        this.aSub.unsubscribe();
    }
}