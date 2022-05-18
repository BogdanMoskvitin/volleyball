import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { MyData } from 'src/app/services/my-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from 'src/app/services/auth.service';

interface Comment {
    comment: string;
    id: number;
}
 
@Component({
    selector: 'event-chat-service-page',
    templateUrl: './event-chat.component.html',
    styleUrls: ['./event-chat.component.scss'],
})

export class EventChatComponent implements OnInit {

    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

    url: string = environment.apiUrl;
    idEvent: number;
    addCommentForm: FormGroup;
    comments;
    comment: Comment;
    text = {comment: ''};
    isSend;
    isAuth: boolean;
    user;

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
    }

    ngOnInit(): void {
        if(this.authService.getToken() == null) {
            this.isAuth = false;
        } else {
            this.isAuth = true;
        }
        this.getUser();
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
        this.http.get(this.url + `events/${this.idEvent}/comments/`).subscribe(res => {
            this.comments = res;
        })
    }

    changeComment(){
        this.text.comment = this.comment.comment;
        this.isSend = !this.isSend;
    }

    sendChangeComment(){
        this.http.patch(this.url + `events/${this.idEvent}/comments/${this.comment.id}/`, this.text).subscribe(res => {
            this.isSend = !this.isSend;
            this.text.comment = '';
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

    sendComment(){
        this.http.post(this.url + `events/${this.idEvent}/comments/`, {comment: this.addCommentForm.value.comment, event: this.idEvent})
        .subscribe(res => {
            this.getComments();
        })
        this.addCommentForm.reset();
    }
}