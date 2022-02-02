import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
    selector: 'locations-service-page',
    templateUrl: './locations.component.html',
    styleUrls: ['./locations.component.scss'],
})

export class LocationsComponent implements OnInit, OnDestroy {

    url:string = environment.apiUrl;
    locations;
    aSub: Subscription;

    constructor(private http: HttpClient) {}
    
    ngOnInit() {
        this.getLocations();
    }

    getLocations() {
        this.aSub = this.http.get(this.url + 'locations/')
            .subscribe((res) => {
                this.locations = res;
        });
    }

    ngOnDestroy(){
        this.aSub.unsubscribe();
    }
}