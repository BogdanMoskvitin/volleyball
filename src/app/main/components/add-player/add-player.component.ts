import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyData } from 'src/app/my-data.service';
import { Location } from '@angular/common';

@Component({
    selector: 'add-player-service-page',
    templateUrl: './add-player.component.html',
    styleUrls: ['./add-player.component.scss'],
})

export class AddPlayerComponent implements OnInit {

    addPlayerForm : FormGroup;
    newPlayer = {};
    url:string = 'https://api.dev.freeteamcollaboration.ru/';
    teams;
    mydata;

    constructor(
        private http: HttpClient, 
        private myData: MyData,
        private location: Location) {
        this.addPlayerForm = new FormGroup({
            team: new FormControl('', Validators.required),
            number: new FormControl('', Validators.required),
        });
    }

    ngOnInit() {
        this.getTeams();
        this.myData.currentData.subscribe(
            (res) => {
                this.mydata = res;
            }
        );
    }

    sendService(){
        this.newPlayer = {
            user: this.mydata.id,
            team: this.addPlayerForm.value.team,
            number: this.addPlayerForm.value.number
        };
        return this.http.post(this.url + 'players/', this.newPlayer)
            .subscribe((res) => {
                this.back();
        });
    }

    getTeams() {
        return this.http.get(this.url + 'teams')
            .subscribe((res) => {
                this.teams = res;
        });
    }

    back(){
        this.location.back();
    }
}