import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyData } from 'src/app/my-data.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
    selector: 'event-service-page',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})

export class EventComponent implements OnInit, OnDestroy {

    events;
    event;
    id: number;
    url: string = environment.apiUrl;
    data;
    idUser;
    players;
    addStatusForm: FormGroup;
    btnTitle: string = '';
    aSub1: Subscription;
    aSub2: Subscription;
    aSub3: Subscription;
    aSub4: Subscription;
    aSub5: Subscription;
    aSub6: Subscription;

    constructor(
        private activateRoute: ActivatedRoute,
        private http: HttpClient, 
        private myData: MyData,
        private router: Router,
        private toastr: ToastrService
        ) {
            this.id = this.activateRoute.snapshot.params['id'];
            this.addStatusForm = new FormGroup({
            player: new FormControl('', Validators.required)
        })
    }

    ngOnInit() {
        this.aSub1 = this.myData.currentData.subscribe((res) => {
            this.idUser = res;
            this.getPlayers();
        });
        
        this.aSub2 = this.http.get(this.url + `events/${this.id}/`)
            .subscribe((res) => {
                this.event = res;
                this.checkPlayer();
        });

        this.aSub3 = this.http.get(this.url + `events/${this.id}/participation/`)
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
        this.aSub4 = this.http.post(this.url + `events/${this.id}/participation/`, this.addStatusForm.value)
            .subscribe((res) => {
                this.aSub5 = this.http.get(this.url + `events/${this.id}/`).subscribe(
                    (res) => {
                        this.toastr.success('Вы проголосовали!');
                        this.event = res;
                        this.checkPlayer();
                    },
                    error => {
                        this.toastr.error('Ошибка голосования');
                    });
        })
    }

    getPlayers() {
        this.aSub6 = this.http.get(this.url + `players/?user=${this.idUser.id}`)
            .subscribe((res) => {
                this.players = res;
        });
    }

    back(){
        this.router.navigateByUrl('main/header/home');
    }

    ngOnDestroy(){
        this.aSub1.unsubscribe();
        this.aSub2.unsubscribe();
        this.aSub3.unsubscribe();
        if(this.aSub4){
            this.aSub4.unsubscribe();
        }
        if(this.aSub5){
            this.aSub5.unsubscribe();
        }
        this.aSub6.unsubscribe();
    }
}