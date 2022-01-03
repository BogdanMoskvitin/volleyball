import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyData } from 'src/app/my-data.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'event-service-page',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})

export class EventComponent implements OnInit {

    events;
    event;
    id: number;
    url: string = 'https://api.dev.freeteamcollaboration.ru/';
    data;
    idUser;
    players;
    addStatusForm: FormGroup;

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
        
        this.http.get(this.url + `events/${this.id}`)
            .subscribe((res) => {
                this.event = res;
        });

        this.http.get(this.url + `events/${this.id}/participation`)
            .subscribe((res) => {
                this.data = res;
        });
    }

    sendStatus() {
        this.http.post(this.url + `events/${this.id}/participation/`, this.addStatusForm.value)
            .subscribe((res) => {
                console.log(res);
                this.http.get(this.url + `events/${this.id}`)
                    .subscribe((res) => {
                        this.event = res;
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