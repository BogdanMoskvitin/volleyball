import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyData } from 'src/app/my-data.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'event-service-page',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})

export class EventComponent implements OnInit {

    events;
    event;
    id: number;
    url: string = environment.apiUrl;
    data;
    idUser;
    players;
    addStatusForm: FormGroup;
    btnTitle: string = '';

    constructor(
        private activateRoute: ActivatedRoute,
        private http: HttpClient, 
        private myData: MyData,
        private router: Router
        ) {
            this.id = this.activateRoute.snapshot.params['id'];
            this.addStatusForm = new FormGroup({
            player: new FormControl('', Validators.required)
        })
    }

    ngOnInit() {
        this.myData.currentData.subscribe((res) => {
            this.idUser = res;
            this.getPlayers();
        });
        
        this.http.get(this.url + `events/${this.id}/`)
            .subscribe((res) => {
                this.event = res;
                this.checkPlayer();
        });

        this.http.get(this.url + `events/${this.id}/participation/`)
            .subscribe((res) => {
                this.data = res;
        });
    }

    checkPlayer(){
        if((this.event.players).length != 0) {
            this.event.players.forEach(key => {
                if(this.idUser.id == key.user.id){
                    this.btnTitle = 'Не приду';
                } else {
                    this.btnTitle = 'Приду';
                }
            });
        } else {
            this.btnTitle = 'Приду';
        }
    }

    sendStatus() {
        this.http.post(this.url + `events/${this.id}/participation/`, this.addStatusForm.value)
            .subscribe((res) => {
                this.http.get(this.url + `events/${this.id}/`)
                    .subscribe((res) => {
                        this.event = res;
                        this.checkPlayer();
                });
        })
    }

    getPlayers() {
        this.http.get(this.url + `players/?user=${this.idUser.id}`)
            .subscribe((res) => {
                this.players = res;
        });
    }

    back(){
        this.router.navigateByUrl('main/header/home');
    }
}