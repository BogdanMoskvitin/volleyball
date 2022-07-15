import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'location-service-page',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})

export class LocationComponent implements OnInit {

    url: string = environment.apiUrl;
    idLocation: number;
    location;

    constructor(
        private http: HttpClient, 
        private activatedRoute: ActivatedRoute,
    ) {
        this.idLocation = this.activatedRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.getLocation();
    }

    getLocation(){
        this.http.get(this.url + `locations/${this.idLocation}/`)
        .subscribe(res => {
            this.location = res
        })
    }
}