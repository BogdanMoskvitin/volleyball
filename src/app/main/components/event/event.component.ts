import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { YaEvent } from 'angular8-yandex-maps';

@Component({
    selector: 'event-service-page',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})

export class EventComponent implements OnInit {

    url: string = environment.apiUrl;
    idEvent: number;
    event;
    isAuth: boolean;
    result;
    statistics;
    application;
    answer;
    view = {
        accepted: true,
        guests: false,
        refused: false,
        invited: false,
        rejected: false,
    }
    nav = {
        players: true,
        chat: false,
        control: false,
    }
    applications;
    user;
    status;
    spinner: boolean;

    constructor(
        private http: HttpClient, 
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        public dialog: MatDialog
    ) {
        this.idEvent = this.activatedRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.spinner = true;
        if(this.authService.getToken() == null) {
            this.isAuth = false;
        } else {
            this.isAuth = true;
        }
        this.getEvent();
        this.getStatistics();
        this.viewAccepted();
        this.getApplication();
    }

    getEvent(){
        this.http.get(this.url + `events/${this.idEvent}/`)
        .subscribe(res => {
            this.event = res;
            this.reverseTime(this.event.time_start);
        })
    }

    getStatistics(){
        this.http.get(this.url + `events/${this.idEvent}/statistics/`)
        .subscribe(res => {
            this.statistics = res;
        })
    }

    sendAccept(){
        if(this.application.accept_button){
            this.http.get(this.url + `events/${this.idEvent}/application?action=accept`)
            .subscribe(res => {
                this.answer = res;
                this.getApplication();
                this.getStatistics();
                this.viewAccepted();
            })
        }
    }

    sendReject(){
        if(this.application.refuse_button){
            this.http.get(this.url + `events/${this.idEvent}/application?action=refuse`)
            .subscribe(res => {
                this.answer = res;
                this.getApplication();
                this.getStatistics();
                this.viewRefused();
            })
        }
    }

    viewAccepted(){
        this.view = {
            accepted: true,
            guests: false,
            refused: false,
            invited: false,
            rejected: false,
        }
        this.http.get(this.url + `events/${this.idEvent}/applications?status=2`)
        .subscribe(res => {
            this.applications = res;
        })
    }
    viewGuests(){
        this.view = {
            accepted: false,
            guests: true,
            refused: false,
            invited: false,
            rejected: false,
        }
    }
    viewRefused(){
        this.view = {
            accepted: false,
            guests: false,
            refused: true,
            invited: false,
            rejected: false,
        }
        this.http.get(this.url + `events/${this.idEvent}/applications?status=5`)
        .subscribe(res => {
            this.applications = res;
        })
    }
    viewInvited(){
        this.view = {
            accepted: false,
            guests: false,
            refused: false,
            invited: true,
            rejected: false,
        }
        this.http.get(this.url + `events/${this.idEvent}/applications?status=4`)
        .subscribe(res => {
            this.applications = res;
        })
    }
    viewRejected(){
        this.view = {
            accepted: false,
            guests: false,
            refused: false,
            invited: false,
            rejected: true,
        }
        this.http.get(this.url + `events/${this.idEvent}/applications?status=3`)
        .subscribe(res => {
            this.applications = res;
        })
    }

    getUser(application){
        this.status = application.user_status.status;
        this.http.get(this.url + `users/${application.user.id}/`)
        .subscribe(res => {
            this.user = res;
        })
    }

    getCreate(user){
        this.status = 'Создатель';
        this.http.get(this.url + `users/${user.id}/`)
        .subscribe(res => {
            this.user = res;
        })
    }

    getApplication(){
        this.http.get(this.url + `events/${this.idEvent}/application/`)
        .subscribe(res => {
            this.application = res;
        })
    }

    viewPlayers(){
        this.nav = {
            players: true,
            chat: false,
            control: false,
        }
    }
    viewChat(){
        this.nav = {
            players: false,
            chat: true,
            control: false,
        }
    }
    viewControl(){
        this.nav = {
            players: false,
            chat: false,
            control: true,
        }
    }

    reverseTime(date){
        let end = new Date(date);
        const timer = setInterval(() => {
            let now = new Date();
            let mls = end.getTime() - now.getTime();
            this.result = new Date(mls)
            this.spinner = false;
        }, 1000);
    }

    openDialog() {
        const dialogRef = this.dialog.open(EventDialog);
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
}



@Component({
  selector: 'event-dialog',
  templateUrl: './event-dialog.html',
})
export class EventDialog implements OnInit {

    places = [
        {x: 45.04, y: 41.95, hintContent: 'Точка 1', iconColor: 'red'},
        {x: 45.05, y: 41.95, hintContent: 'Точка 2', iconColor: 'green'},
        {x: 45.06, y: 41.95, hintContent: 'Точка 3', iconColor: 'blue'},
    ]

    coords;
    isLocation = false;

    constructor() {}

    ngOnInit() {}

    onMapClick(e: YaEvent<ymaps.Map>): void {
        const { target, event } = e;
    
        if (!target.balloon.isOpen()) {
            this.isLocation = true;
            const coords = event.get('coords');

            target.balloon.open(coords, {
                contentHeader: 'Новое место!',
                contentBody:
                    '<p>Координаты: ' +
                    [coords[0].toPrecision(6), coords[1].toPrecision(6)].join(', ') +
                    '</p>', 
            }, {closeButton: false});
            this.coords = coords;
        } else {
            this.isLocation = false;
            target.balloon.close();
        }
      }

      saveLocation(){
        console.log({x: this.coords[0], y: this.coords[1], hintContent: 'Новая точка', iconColor: 'orange'})
        this.places.push({x: this.coords[0], y: this.coords[1], hintContent: 'Новая точка', iconColor: 'orange'})
      }
}