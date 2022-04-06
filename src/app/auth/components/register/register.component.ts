import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Register } from '../../models/auth.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'register-service-page',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit, OnDestroy {

    regForm : FormGroup;
    aSub: Subscription;
    checkPassword = false;
    form: Register = { } as Register;
    hide = true;
    hide2 = true;

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService
    ) {
        this.regForm = new FormGroup({
            first_name: new FormControl('', [Validators.required]),
            last_name: new FormControl('', [Validators.required]),
            phone_number: new FormControl('+7', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            password2: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit() {}

    checkForm(){
        let strPassword = this.regForm.value.password;
        let strPassword2 = this.regForm.value.password2;
        if(strPassword == strPassword2){
            this.checkPassword = false;
            this.constructForm();
            this.sendService();
        } else {
            this.checkPassword = true;
        }
    }

    constructForm(){
        this.form.first_name = this.regForm.value.first_name;
        this.form.last_name = this.regForm.value.last_name;
        this.form.phone_number = '+7' + this.regForm.value.phone_number;
        this.form.email = this.regForm.value.email;
        this.form.password = this.regForm.value.password;
    }

    sendService(){
        this.regForm.disable();
        this.aSub = this.authService.registration(this.form).subscribe(
            () => {
                this.toastr.success('Вы зарегестрированы!');
                this.router.navigate(['/auth/register-profile'], {
                    queryParams: {
                        registered: true
                    }
                })
            },
            error => {
                this.router.navigate(['/auth'])
                this.toastr.error('Ошибка регистрации');
                this.regForm.enable();
            }
        )
    }

    ngOnDestroy() {
        if(this.aSub){
            this.aSub.unsubscribe();
        }
    }
}