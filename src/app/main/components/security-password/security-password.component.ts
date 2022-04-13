import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'security-password-service-page',
    templateUrl: './security-password.component.html',
    styleUrls: ['./security-password.component.scss'],
})

export class SecurityPasswordComponent implements OnInit {

    changeForm : FormGroup;
    hide = true;
    hide2 = true;
    url:string = environment.apiUrl;
    token:string;

    constructor(
        private router: Router,
        private http: HttpClient,
        private toastr: ToastrService
    ) {
        this.token = document.location.search.slice(7);
        this.changeForm = new FormGroup({
            password: new FormControl('', [Validators.required]),
            password_repeat: new FormControl('', [Validators.required]), 
        });
    }
    
    ngOnInit() {
        this.http.post(this.url + `password_reset/check/${this.token}/`, '').subscribe(
            (res) => {
                this.toastr.success('Ответ получен!');
            },
            error => {
                this.toastr.error('Ошибка подтверждения');
                this.router.navigateByUrl('');
            });
    }

    sendService(){
        this.http.post(this.url + `password_reset/confirm/${this.token}/`, this.changeForm.value).subscribe(
            (res) => {
                this.toastr.success('Пароль изменен!');
                this.router.navigateByUrl('');
            },
            error => {
                this.toastr.error('Что-то пошло не так, попробуйте позднее');
            });
    }
}