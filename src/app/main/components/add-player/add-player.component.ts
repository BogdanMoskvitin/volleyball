import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyData } from 'src/app/my-data.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'add-player-service-page',
    templateUrl: './add-player.component.html',
    styleUrls: ['./add-player.component.scss'],
})

export class AddPlayerComponent implements OnInit {

    id: number;
    addPlayerForm : FormGroup;
    newPlayer = {};
    url:string = environment.apiUrl;
    team;
    mydata;

    constructor(
        private http: HttpClient, 
        private myData: MyData,
        private location: Location,
        private activateRoute: ActivatedRoute,
        private toastr: ToastrService) {
        this.id = this.activateRoute.snapshot.params['id'];
        this.addPlayerForm = new FormGroup({
            number: new FormControl('', [Validators.required, Validators.min(1), Validators.max(24)]),
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
            team: this.id,
            number: this.addPlayerForm.value.number
        };
        return this.http.post(this.url + 'players/', this.newPlayer).subscribe(
            (res) => {
                this.toastr.success('Игрок создан!');
                this.back();
            },
            error => {
                this.toastr.error('Ошибка создания игрока');
            });
    }

    getTeams() {
        return this.http.get(this.url + `teams/${this.id}/`)
            .subscribe((res) => {
                this.team = res;
        });
    }

    back(){
        this.location.back();
    }
}