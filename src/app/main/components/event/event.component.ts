import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { MyData } from 'src/app/my-data.service';
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
    user;
    event;
    addCommentForm: FormGroup;
    commentWindow = true;
    comments;
    comment: Comment;
    isSend;
    isAuth: boolean;
    list = {
        participants: true,
        surveys: false,
        guests: false
    }

    constructor(
        private http: HttpClient, 
        private activatedRoute: ActivatedRoute,
        private myData: MyData,
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
        this.getUser();
        this.getEvent();
        this.getComments();
    }

    viewParticipants(){
        this.list = {
            participants: true,
            surveys: false,
            guests: false
        }
    }
    viewSurveys(){
        this.list = {
            participants: false,
            surveys: true,
            guests: false
        }
    }
    viewGuests(){
        this.list = {
            participants: false,
            surveys: false,
            guests: true
        }
    }

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

    getUser(){
        this.myData.currentData.subscribe(res => {
            this.user = res;
        })
    }

    getEvent(){
        this.http.get(this.url + `events/${this.idEvent}/`)
        .subscribe(res => {
            this.event = res;
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

    sendApplicationTrue(){
        this.http.get(this.url + `events/${this.idEvent}/application?action=accept`)
        .subscribe(res => {
            console.log(res);
            this.getEvent();
        })
    }
    sendApplicationFalse(){
        this.http.get(this.url + `events/${this.idEvent}/application?action=refuse`)
        .subscribe(res => {
            console.log(res);
            this.getEvent();
        })
    }
}