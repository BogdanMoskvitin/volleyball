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
    url:string = 'https://api.dev.freeteamcollaboration.ru/';
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
        
        this.http.get(this.url + 'events')
            .subscribe((res) => {
                this.events = res;
                console.log(this.events)
                for(let e in this.events.results){
                    if(this.events.results[e].id == this.id){
                        this.event = this.events.results[e];
                    }
                }
        });

        this.http.get(this.url + `events/${this.id}/participation`)
            .subscribe((res) => {
                this.data = res;
        });
    }

    sendStatus() {
        return this.http.post(this.url + `events/${this.id}/participation/`, this.addStatusForm.value)
            .subscribe((res) => {
                console.log(res);
            });
    }

    getPlayers() {
        this.http.get(this.url + `players/?user=${this.idUser.id}`)
            .subscribe((res) => {
                this.players = res;
                console.log(this.players);
        });
    }

    back(){
        this.router.navigateByUrl('main/home');
    }
}