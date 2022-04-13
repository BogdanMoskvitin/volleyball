import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'change-password-service-page',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})

export class ChangePasswordComponent implements OnInit {

    changeForm : FormGroup;
    url:string = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private toastr: ToastrService
    ) {
        this.changeForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
        });
    }
    
    ngOnInit() { }

    sendService(){
        this.http.patch(this.url + `password_reset/`, this.changeForm.value).subscribe(
            (res) => {
                this.toastr.success('Письмо с инструкцией по сбросу пароля было отправлено на почту');
            },
            error => {
                this.toastr.error('Почта не была подтверждена или такой почты не существует');
            });
    }

}