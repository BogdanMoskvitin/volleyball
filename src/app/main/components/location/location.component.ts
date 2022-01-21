import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'location-service-page',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})

export class LocationComponent implements OnInit {

    url:string = environment.apiUrl;
    location;
    id:number;

    constructor(private http: HttpClient, activateRoute: ActivatedRoute) {
        this.id = activateRoute.snapshot.params['id'];
    }
    
    ngOnInit() {
        this.getLocation();
    }

    getLocation() {
        return this.http.get(this.url + `locations/${this.id}/`)
            .subscribe((res) => {
                this.location = res;
        });
    }
}