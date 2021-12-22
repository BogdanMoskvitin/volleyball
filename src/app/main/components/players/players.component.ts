import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'players-service-page',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss'],
})

export class PlayersComponent implements OnInit {

    id: number;
    url: string = 'https://api.dev.freeteamcollaboration.ru/';
    players;
    team;

    constructor(
        private http: HttpClient, 
        private activateRoute: ActivatedRoute,
        private router: Router) {
        this.id = this.activateRoute.snapshot.params['id'];
    }
    
    ngOnInit() {

        this.http.get(this.url + `teams/${this.id}/`)
            .subscribe((res) => {
                this.team = res;
                console.log(this.team);
        });
    }

    back(){
        this.router.navigateByUrl('main/header/teams');
    }
}