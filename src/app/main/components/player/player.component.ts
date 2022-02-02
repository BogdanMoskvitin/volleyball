import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
    selector: 'player-service-page',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
})

export class PlayerComponent implements OnInit, OnDestroy {

    id: number;
    url: string = environment.apiUrl;
    player;
    aSub: Subscription;

    constructor(
        private http: HttpClient, 
        private activateRoute: ActivatedRoute,
        private location: Location) {
        this.id = this.activateRoute.snapshot.params['id'];
    }
    
    ngOnInit() {
        this.aSub = this.http.get(this.url + `players/${this.id}/`)
            .subscribe((res) => {
                this.player = res;
        });
    }

    back(){
        this.location.back();
    }

    ngOnDestroy(){
        this.aSub.unsubscribe();
    }
}