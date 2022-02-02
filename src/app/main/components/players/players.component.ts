import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
    selector: 'players-service-page',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss'],
})

export class PlayersComponent implements OnInit, OnDestroy {

    id: number;
    url: string = environment.apiUrl;
    players;
    team;
    count;
    aSub: Subscription;

    constructor(
        private http: HttpClient, 
        private activateRoute: ActivatedRoute,
        private router: Router) {
        this.id = this.activateRoute.snapshot.params['id'];
    }
    
    ngOnInit() {
        this.aSub = this.http.get(this.url + `teams/${this.id}/`)
            .subscribe((res) => {
                this.team = res;
                if(this.team.players_count == 0) {
                    this.count = 'В команде пока ещё нет игроков';
                } else {
                    this.count = this.team.players_count;
                }
        });
    }

    back(){
        this.router.navigateByUrl('main/header/teams');
    }

    ngOnDestroy(){
        this.aSub.unsubscribe();
    }
}