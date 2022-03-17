import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
    selector: 'locations-service-page',
    templateUrl: './locations.component.html',
    styleUrls: ['./locations.component.scss'],
})

export class LocationsComponent implements OnInit, OnDestroy {

    url:string = environment.apiUrl;
    locations;
    aSub: Subscription;
    aAuth: boolean;

    constructor(private http: HttpClient, private authService: AuthService) {}
    
    ngOnInit() {
        if(this.authService.getToken() == null) {
            this.aAuth = false;
        } else {
            this.aAuth = true;
        }
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