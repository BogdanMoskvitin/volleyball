// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { environment } from 'src/environments/environment';
// import { ActivatedRoute } from '@angular/router';
// import { MyData } from 'src/app/my-data.service';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatMenuTrigger } from '@angular/material/menu';
// import { AuthService } from 'src/app/auth/services/auth.service';

// interface Comment {
//     comment: string;
//     id: number;
// }
 
// @Component({
//     selector: 'event-service-page',
//     templateUrl: './event.component.html',
//     styleUrls: ['./event.component.scss'],
// })

// export class EventComponent implements OnInit {

//     @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

//     url: string = environment.apiUrl;
//     idEvent: number;
//     user;
//     event;
//     addCommentForm: FormGroup;
//     commentWindow = true;
//     comments;
//     comment: Comment;
//     isSend;
//     isAuth: boolean;
//     list = {
//         participants: true,
//         surveys: false,
//         guests: false
//     }
//     result;

//     constructor(
//         private http: HttpClient, 
//         private activatedRoute: ActivatedRoute,
//         private myData: MyData,
//         private authService: AuthService
//     ) {
//         this.idEvent = this.activatedRoute.snapshot.params['id'];
//         this.addCommentForm = new FormGroup({
//             comment: new FormControl(''),
//             id: new FormControl('')
//         })
//     }

//     ngOnInit(): void {
//         if(this.authService.getToken() == null) {
//             this.isAuth = false;
//         } else {
//             this.isAuth = true;
//         }
//         this.getUser();
//         this.getEvent();
//         this.getComments();
//     }

//     viewParticipants(){
//         this.list = {
//             participants: true,
//             surveys: false,
//             guests: false
//         }
//     }
//     viewSurveys(){
//         this.list = {
//             participants: false,
//             surveys: true,
//             guests: false
//         }
//     }
//     viewGuests(){
//         this.list = {
//             participants: false,
//             surveys: false,
//             guests: true
//         }
//     }

//     openMenu(comment){
//         console.log(comment)
//         if(comment.user.id == this.user.id){
//             this.trigger.openMenu();
//             this.comment = comment;
//         } else {
//             this.trigger.closeMenu();
//         }
//     }

//     getComments(){
//         this.http.get(this.url + `events/${this.idEvent}/comments/`).subscribe(res => {
//             this.comments = res;
//         })
//     }

//     changeComment(){
//         this.addCommentForm.value.comment = this.comment.comment;
//         this.isSend = !this.isSend;
//     }

//     sendChangeComment(){
//         this.http.patch(this.url + `events/${this.idEvent}/comments/${this.comment.id}/`, this.addCommentForm.value).subscribe(res => {
//             this.isSend = !this.isSend;
//             this.getComments();
//         })
//     }

//     deleteComment(){
//         this.http.delete(this.url + `events/${this.idEvent}/comments/${this.comment.id}/`).subscribe(res => {
//             this.getComments();
//         })
//     }

//     getUser(){
//         this.myData.currentData.subscribe(res => {
//             this.user = res;
//         })
//     }

//     getEvent(){
//         this.http.get(this.url + `events/${this.idEvent}/`)
//         .subscribe(res => {
//             this.event = res;
//             this.reverseTime(this.event.time_start);
//         })
//     }

//     sendComment(){
//         this.http.post(this.url + `events/${this.idEvent}/comments/`, {comment: this.addCommentForm.value.comment, event: this.idEvent})
//         .subscribe(res => {
//             this.getComments();
//         })
//         this.addCommentForm.reset();
//     }

//     openComment(){
//         this.commentWindow = !this.commentWindow;
//     }

//     sendApplicationTrue(){
//         this.http.get(this.url + `events/${this.idEvent}/application?action=accept`)
//         .subscribe(res => {
//             console.log(res);
//             this.getEvent();
//         })
//     }
//     sendApplicationFalse(){
//         this.http.get(this.url + `events/${this.idEvent}/application?action=refuse`)
//         .subscribe(res => {
//             console.log(res);
//             this.getEvent();
//         })
//     }
//     reverseTime(date){
//         let end = new Date(date);
//         const timer = setInterval(() => {
//             let now = new Date();
//             let mls = end.getTime() - now.getTime();
//             this.result = new Date(mls)
//         }, 1000);
//     }
// }


import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
// import { MyData } from 'src/app/my-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from 'src/app/auth/services/auth.service';

interface Comment {
    comment: string;
    id: number;
}
 
@Component({
    selector: 'event-service-page',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})

export class EventComponent implements OnInit {

    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

    url: string = environment.apiUrl;
    idEvent: number;
//     user;
    event;
    addCommentForm: FormGroup;
    commentWindow = true;
    comments;
    comment: Comment;
    isSend;
    isAuth: boolean;
//     list = {
//         participants: true,
//         surveys: false,
//         guests: false
//     }
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

    constructor(
        private http: HttpClient, 
        private activatedRoute: ActivatedRoute,
//         private myData: MyData,
        private authService: AuthService
    ) {
        this.idEvent = this.activatedRoute.snapshot.params['id'];
        this.addCommentForm = new FormGroup({
            comment: new FormControl(''),
            id: new FormControl('')
        })
    }

    ngOnInit(): void {
        if(this.authService.getToken() == null) {
            this.isAuth = false;
        } else {
            this.isAuth = true;
        }
//         this.getUser();
        this.getEvent();
        this.getStatistics();
        this.viewAccepted();
        this.getApplication();
    }

//     viewParticipants(){
//         this.list = {
//             participants: true,
//             surveys: false,
//             guests: false
//         }
//     }
//     viewSurveys(){
//         this.list = {
//             participants: false,
//             surveys: true,
//             guests: false
//         }
//     }
//     viewGuests(){
//         this.list = {
//             participants: false,
//             surveys: false,
//             guests: true
//         }
//     }

    openMenu(comment){
        console.log(comment)
        if(comment.user.id == this.user.id){
            this.trigger.openMenu();
            this.comment = comment;
        } else {
            this.trigger.closeMenu();
        }
    }

    getComments(){
        this.http.get(this.url + `events/${this.idEvent}/comments/`).subscribe(res => {
            this.comments = res;
        })
    }

    changeComment(){
        this.addCommentForm.value.comment = this.comment.comment;
        this.isSend = !this.isSend;
    }

    sendChangeComment(){
        this.http.patch(this.url + `events/${this.idEvent}/comments/${this.comment.id}/`, this.addCommentForm.value).subscribe(res => {
            this.isSend = !this.isSend;
            this.getComments();
        })
    }

    deleteComment(){
        this.http.delete(this.url + `events/${this.idEvent}/comments/${this.comment.id}/`).subscribe(res => {
            this.getComments();
        })
    }

    sendComment(){
        this.http.post(this.url + `events/${this.idEvent}/comments/`, {comment: this.addCommentForm.value.comment, event: this.idEvent})
        .subscribe(res => {
            this.getComments();
        })
        this.addCommentForm.reset();
    }

    openComment(){
        this.commentWindow = !this.commentWindow;
    }

//     getUser(){
//         this.myData.currentData.subscribe(res => {
//             this.user = res;
//         })
//     }

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

    getUser(user){
        this.http.get(this.url + `users/${user}/`)
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
        this.getComments();
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
        }, 1000);
    }
}
