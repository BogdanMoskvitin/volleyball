import { Component, OnInit } from '@angular/core';
import { MyData } from 'src/app/my-data.service';
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
    mydata;
    checkPassword = false;
    hide = true;
    hide2 = true;
    url:string = environment.apiUrl;
    id: number;

    constructor(
        private myData: MyData,
        private http: HttpClient,
        private toastr: ToastrService
    ) { }
    
    ngOnInit() {
        this.myData.currentData.subscribe(
            (res) => {
                this.mydata = res;
                this.id = this.mydata.id;
                this.changeForm = new FormGroup({
                    password: new FormControl('', [Validators.required]),
                    password2: new FormControl('', [Validators.required]), 
                });
            }
        );
    }

    checkForm(){
        let strPassword = this.changeForm.value.password;
        let strPassword2 = this.changeForm.value.password2;
        if(strPassword == strPassword2){
            this.checkPassword = false;
            this.sendService();
        } else {
            this.checkPassword = true;
        }
    }

    sendService(){
        let newPassword = {password: this.changeForm.value.password};
        return this.http.patch(this.url + `auth/users/${this.id}`, newPassword).subscribe(
            (res) => {
                this.toastr.success('Пароль изменен!');
                window.location.reload();
            },
            error => {
                this.toastr.error('Ошибка изменения пароля');
            });
    }
}