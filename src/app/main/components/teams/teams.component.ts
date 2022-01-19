import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'teams-service-page',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.scss'],
})

export class TeamsComponent implements OnInit {

    teams;
    url:string = 'https://api.dev.freeteamcollaboration.ru/';

    constructor(private http: HttpClient) {}
    
    ngOnInit() {
        this.getTeams();
    }

    getTeams() {
        return this.http.get(this.url + 'teams/')
            .subscribe((res) => {
                this.teams = res;
        });
    }
}