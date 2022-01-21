import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'locations-service-page',
    templateUrl: './locations.component.html',
    styleUrls: ['./locations.component.scss'],
})

export class LocationsComponent implements OnInit {

    url:string = environment.apiUrl;
    locations;

    constructor(private http: HttpClient) {}
    
    ngOnInit() {
        this.getLocations();
    }

    getLocations() {
        return this.http.get(this.url + 'locations/')
            .subscribe((res) => {
                this.locations = res;
        });
    }
}