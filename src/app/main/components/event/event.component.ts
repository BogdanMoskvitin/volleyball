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
    players;
    addCommentForm: FormGroup;
    addStatusForm: FormGroup;
    surveys;
    answer;
    idObject;
    object;
    commentWindow = false;
    comments;
    comment: Comment;
    text = {comment: ''};
    isSend;
    isAuth: boolean;

    constructor(
        private http: HttpClient, 
        private activatedRoute: ActivatedRoute,
        private myData: MyData,
        private authService: AuthService
    ) {
        this.idEvent = this.activatedRoute.snapshot.params['id'];
        this.addCommentForm = new FormGroup({
            comment: new FormControl('')
        })
        this.addStatusForm = new FormGroup({
            player: new FormControl('', Validators.required)
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

    openMenu(comment){
        if(comment.user.id == this.user.id){
            this.trigger.openMenu();
            this.comment = comment;
        } else {
            this.trigger.closeMenu();
        }
    }

    getComments(){
        this.http.get(this.url + `events/all/${this.idEvent}/comments/`).subscribe(res => {
            this.comments = res;
        })
    }

    changeCommit(){
        this.text.comment = this.comment.comment;
        this.isSend = !this.isSend;
    }

    sendChangeCommit(){
        this.http.patch(this.url + `events/all/${this.idEvent}/comments/${this.comment.id}/`, this.text).subscribe(res => {
            this.isSend = !this.isSend;
            this.text.comment = '';
            this.getComments();
        })
    }

    deleteCommit(){
        this.http.delete(this.url + `events/all/${this.idEvent}/comments/${this.comment.id}/`).subscribe(res => {
            this.getComments();
        })
    }

    getUser(){
        this.myData.currentData.subscribe(res => {
            this.user = res;
            if(this.user.id != undefined){
                this.getSurveys();
                this.getObject();
            }
            
        })
    }

    getObject(){
        this.http.get(this.url + `events/all/${this.idEvent}/surveys/?user=${this.user.id}`).subscribe(res => {
            this.object = res;
            if(this.object.results.length != 0){
                this.idObject = this.object.results[0].id;
            }
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
            this.getComments();
        })
        this.addCommentForm.reset();
    }

    sendTruePost(){
        this.http.post(this.url + `events/all/${this.idEvent}/surveys/`, {answer: true})
        .subscribe(res => {
            this.getEvent();
            this.getSurveys();
            this.getObject();
        });
    }

    sendFalsePost(){
        this.http.post(this.url + `events/all/${this.idEvent}/surveys/`, {answer: false})
        .subscribe(res => {
            this.getEvent();
            this.getSurveys();
            this.getObject();
        })
    }

    sendTruePut(){
        this.http.put(this.url + `events/all/${this.idEvent}/surveys/${this.idObject}/`, {answer: true})
        .subscribe(res => {
            this.getEvent();
            this.getSurveys();
        });
    }

    sendFalsePut(){
        this.http.put(this.url + `events/all/${this.idEvent}/surveys/${this.idObject}/`, {answer: false})
        .subscribe(res => {
            this.getEvent();
            this.getSurveys();
        })
    }

    getSurveys(){
        this.http.get(this.url + `events/all/${this.idEvent}/surveys/?user=${this.user.id}`)
        .subscribe(res => {
            this.surveys = res;
            if(this.surveys.results.length != 0){
                this.answer = this.surveys.results[0].answer;
            } 
        })
    }

    openComment(){
        this.commentWindow = !this.commentWindow;
    }
}