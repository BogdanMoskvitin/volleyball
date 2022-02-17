import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
    selector: 'home-service-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {

    events;
    url:string = environment.apiUrl;
    aSub: Subscription;
    aAuth: boolean;

    constructor(private http: HttpClient, private authService: AuthService) {}
    
    ngOnInit() {
        if(this.authService.getToken() == null) {
            this.aAuth = false;
        } else {
            this.aAuth = true;
        }
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