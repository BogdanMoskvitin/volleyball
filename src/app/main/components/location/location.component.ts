import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'location-service-page',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})

export class LocationComponent implements OnInit {

    url:string = 'https://api.dev.freeteamcollaboration.ru/';
    location;
    id:number;

    constructor(private http: HttpClient, activateRoute: ActivatedRoute) {
        this.id = activateRoute.snapshot.params['id'];
    }
    
    ngOnInit() {
        this.getLocation();
    }

    getLocation() {
        return this.http.get(this.url + `locations/${this.id}`)
            .subscribe((res) => {
                this.location = res;
                console.log(this.location)
        });
    }
}