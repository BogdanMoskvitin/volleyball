// import { HttpClient } from '@angular/common/http';
// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { MyData } from 'src/app/my-data.service';
// import { Router } from '@angular/router';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { environment } from 'src/environments/environment';
// import { ToastrService } from 'ngx-toastr';
// import { Subscription } from 'rxjs';

// @Component({
//     selector: 'event-service-page',
//     templateUrl: './event.component.html',
//     styleUrls: ['./event.component.scss'],
// })

// export class EventComponent implements OnInit, OnDestroy {

//     events;
//     event;
//     id: number;
//     url: string = environment.apiUrl;
//     idUser;
//     players;
//     addStatusForm: FormGroup;
//     btnTitle: string = '';
//     aSub1: Subscription;
//     aSub2: Subscription;
//     aSub4: Subscription;
//     aSub5: Subscription;
//     aSub6: Subscription;
//     addCommentForm: FormGroup;
//     qwerty;

//     constructor(
//         private activateRoute: ActivatedRoute,
//         private http: HttpClient, 
//         private myData: MyData,
//         private router: Router,
//         private toastr: ToastrService
//         ) {
//             this.id = this.activateRoute.snapshot.params['id'];
//             this.addStatusForm = new FormGroup({
//             player: new FormControl('', Validators.required)
//         })
//         this.addCommentForm = new FormGroup({
//             comment: new FormControl('', Validators.required)
//         })
//     }

//     sendComment(){
//         this.http.post(this.url + `events/all/${this.id}/comments/`, {comment: this.addCommentForm.value.comment, player: 6, event: this.id}).subscribe(res => console.log(res))
//     }

//     ngOnInit() {
//         this.aSub1 = this.myData.currentData.subscribe((res) => {
//             this.idUser = res;
//             console.log('id1:' + this.idUser.id)
//             this.getPlayers();
//             console.log('id2:' + this.idUser.id)
//             this.getPlayer();
//         });
        
//         this.aSub2 = this.http.get(this.url + `events/all/${this.id}/`)
//             .subscribe((res) => {
//                 this.event = res;
//                 this.checkPlayer();
//         });   
//     }

//     getPlayer(){
//         console.log('id3:' + this.idUser.id)
//         this.http.get(this.url + `events/all/${this.id}/surveys?player__user=${this.idUser.id}`)
//         .subscribe((res) => {
//             console.log(res)
//         });
//     }

//     getPlayers() {
//         console.log('id4:' + this.idUser.id)
//         this.aSub6 = this.http.get(this.url + `players/all/?id=${this.idUser.id}`)
//             .subscribe((res) => {
//                 this.players = res;
//         });
//     }

//     checkPlayer(){
//         if((this.event.players).length != 0) {
//             this.event.players.forEach(key => {
//                 if(this.idUser.id == key.user.id){
//                     this.btnTitle = 'Не приду';
//                 } else {
//                     this.btnTitle = 'Приду';
//                 }
//             });
//         } else {
//             this.btnTitle = 'Приду';
//         }
//     }

//     sendStatus() {
//         this.aSub4 = this.http.post(this.url + `events/all/${this.id}/participation/`, this.addStatusForm.value)
//             .subscribe((res) => {
//                 this.aSub5 = this.http.get(this.url + `events/all/${this.id}/`).subscribe(
//                     (res) => {
//                         this.toastr.success('Вы проголосовали!');
//                         this.event = res;
//                         this.checkPlayer();
//                     },
//                     error => {
//                         this.toastr.error('Ошибка голосования');
//                     });
//         })
//     }

//     back(){
//         this.router.navigateByUrl('main/header/home');
//     }

//     ngOnDestroy(){
//         this.aSub1.unsubscribe();
//         this.aSub2.unsubscribe();
//         if(this.aSub4){
//             this.aSub4.unsubscribe();
//         }
//         if(this.aSub5){
//             this.aSub5.unsubscribe();
//         }
//         this.aSub6.unsubscribe();
//     }

//     sendTrue(){
//         this.http.post(this.url + `events/all/${this.id}/surveys/`, {answer: true, player: this.addStatusForm.value.player, event: +this.id}).subscribe(res => console.log(res));
//     }
//     sendFalse(){
//         this.http.post(this.url + `events/all/${this.id}/surveys/`, {answer: false, player: this.addStatusForm.value.player, event: +this.id}).subscribe(res => console.log(res));
//     }


// }


import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { MyData } from 'src/app/my-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'event-service-page',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})

export class EventComponent implements OnInit {

    url: string = environment.apiUrl;
    idEvent: number;
    user;
    event;
    players;
    addCommentForm: FormGroup;
    addStatusForm: FormGroup;
    surveys;
    answer;
    idObject;
    object

    constructor(
        private http: HttpClient, 
        private activatedRoute: ActivatedRoute,
        private myData: MyData,
    ) {
        this.idEvent = this.activatedRoute.snapshot.params['id'];
        this.addCommentForm = new FormGroup({
            comment: new FormControl('', Validators.required)
        })
        this.addStatusForm = new FormGroup({
            player: new FormControl('', Validators.required)
        })
    }

    ngOnInit(): void {
        this.getUser();
        this.getEvent();
        this.http.get(this.url + `events/all/5/surveys/`).subscribe(res => {
            this.object = res;
            this.idObject = this.object.results[0].id;
        })
    }

    getUser(){
        this.myData.currentData.subscribe(res => {
            this.user = res;
            this.getSurveus();
        })
    }

    getEvent(){
        this.http.get(this.url + `events/all/${this.idEvent}`)
        .subscribe(res => {
            this.event = res;
        })
    }

    sendComment(){
        this.http.post(this.url + `events/all/${this.idEvent}/comments/`, {comment: this.addCommentForm.value.comment})
        .subscribe(res => {
            this.getEvent();
        })
    }

    sendTruePost(){
        this.http.post(this.url + `events/all/${this.idEvent}/surveys/`, {answer: true})
        .subscribe(res => {
            this.getEvent();
            this.getSurveus();
        });
    }

    sendFalsePost(){
        this.http.post(this.url + `events/all/${this.idEvent}/surveys/`, {answer: false})
        .subscribe(res => {
            this.getEvent();
            this.getSurveus();
        })
    }

    sendTruePut(){
        this.http.put(this.url + `events/all/${this.idEvent}/surveys/${this.idObject}/`, {answer: true})
        .subscribe(res => {
            this.getEvent();
            this.getSurveus();
        });
    }

    sendFalsePut(){
        this.http.put(this.url + `events/all/${this.idEvent}/surveys/${this.idObject}/`, {answer: false})
        .subscribe(res => {
            this.getEvent();
            this.getSurveus();
        })
    }

    getSurveus(){
        this.http.get(this.url + `events/all/${this.idEvent}/surveys/?user=${this.user.id}`)
        .subscribe(res => {
            this.surveys = res;
            this.answer = this.surveys.results[0].answer;
        })
    }

}