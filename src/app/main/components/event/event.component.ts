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
    object;
    commentWindow = false;

    constructor(
        private http: HttpClient, 
        private activatedRoute: ActivatedRoute,
        private myData: MyData,
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
        this.getUser();
        this.getEvent();
        
    }

    getUser(){
        this.myData.currentData.subscribe(res => {
            this.user = res;
            this.getSurveys();
            this.getObject();
        })
    }

    getObject(){
        this.http.get(this.url + `events/all/${this.idEvent}/surveys/?user=${this.user.id}`).subscribe(res => {
            this.object = res;
            this.idObject = this.object.results[0].id;
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
            this.answer = this.surveys.results[0].answer;
        })
    }

    openComment(){
        this.commentWindow = !this.commentWindow;
    }
}