import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'players-service-page',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss'],
})

export class PlayersComponent implements OnInit {

    url:string = 'https://api.dev.freeteamcollaboration.ru/';
    players;

    constructor(private http: HttpClient) {}
    
    ngOnInit() {
        this.getPlayers();
    }

    getPlayers() {
        return this.http.get(this.url + 'players')
            .subscribe((res) => {
                this.players = res;
        });
    }
}