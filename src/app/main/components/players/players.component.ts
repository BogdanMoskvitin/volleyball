import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MyData } from 'src/app/my-data.service';

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
    aSub2: Subscription;
    aAuth: boolean;
    mydata;
    isHere: boolean;

    constructor(
        private http: HttpClient, 
        private activateRoute: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private myData: MyData,) {
        this.id = this.activateRoute.snapshot.params['id'];
    }
    
    ngOnInit() {
        if(this.authService.getToken() == null) {
            this.aAuth = false;
        } else {
            this.aAuth = true;
        }
        this.aSub = this.http.get(this.url + `teams/all/${this.id}/`)
            .subscribe((res) => {
                this.team = res;
                if(this.team.players_count == 0) {
                    this.count = 'В команде пока ещё нет игроков';
                } else {
                    this.count = this.team.players_count;
                    this.aSub2 = this.myData.currentData.subscribe(
                        (res) => {
                            this.mydata = res;
                            this.team.players.forEach(player => {
                                if(player.user.id == this.mydata.id){
                                    this.isHere = true;
                                } else {
                                    this.isHere = false;
                                }
                            });
                        }
                    );
                }
        });   
    }

    back(){
        this.router.navigateByUrl('main/header/teams');
    }

    ngOnDestroy(){
        this.aSub.unsubscribe();
        this.aSub2.unsubscribe();
    }
}