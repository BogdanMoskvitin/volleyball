import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

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

    ngOnDestroy(){
        this.aSub.unsubscribe();
    }
}