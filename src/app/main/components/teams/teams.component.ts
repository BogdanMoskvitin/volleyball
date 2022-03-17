import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
    selector: 'teams-service-page',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.scss'],
})

export class TeamsComponent implements OnInit, OnDestroy {

    teams;
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
        this.getTeams();
    }

    getTeams() {
        this.aSub = this.http.get(this.url + 'teams/')
            .subscribe((res) => {
                this.teams = res;
        });
    }

    ngOnDestroy(){
        this.aSub.unsubscribe();
    }
}