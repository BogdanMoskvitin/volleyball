import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'team-service-page',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss'],
})

export class TeamComponent implements OnInit {

    teams;
    url:string = environment.apiUrl;
    aAuth: boolean;
    team;
    idTeam: number;

    constructor(
        private http: HttpClient, 
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
    ) {
        this.idTeam = this.activatedRoute.snapshot.params['id'];
    }
    
    ngOnInit() {
        if(this.authService.getToken() == null) {
            this.aAuth = false;
        } else {
            this.aAuth = true;
        }
        this.getTeam();
    }

    getTeam(){
        this.http.get(this.url + `teams/${this.idTeam}/`)
        .subscribe(res => {
            this.team = res;
        })
    }
}