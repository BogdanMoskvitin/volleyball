import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'player-service-page',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
})

export class PlayerComponent implements OnInit {

    id: number;
    url: string = 'https://api.dev.freeteamcollaboration.ru/';
    player;

    constructor(
        private http: HttpClient, 
        private activateRoute: ActivatedRoute,
        private location: Location) {
        this.id = this.activateRoute.snapshot.params['id'];
    }
    
    ngOnInit() {
        this.http.get(this.url + `players/${this.id}/`)
            .subscribe((res) => {
                this.player = res;
        });
    }

    back(){
        this.location.back();
    }
}