import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'auth-service-page',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})

export class AuthComponent implements OnInit {
    authForm : FormGroup;

    constructor() {
        this.authForm = new FormGroup({
            lastName: new FormControl('', [Validators.required, Validators.pattern("^[а-яА-ЯёЁ]+$")]),
            firstName: new FormControl('', [Validators.required, Validators.pattern("^[а-яА-ЯёЁ]+$")]),
            middleName: new FormControl('', [Validators.required, Validators.pattern("^[а-яА-ЯёЁ]+$")]),
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            phone: new FormControl('', [Validators.required]),
            // number: new FormControl('', [
            //     Validators.required, 
            //     Validators.pattern("^[0-9]+$"),
            //     Validators.maxLength(2),
            //     Validators.min(1),
            //     Validators.max(24)
            // ]),
        });
    }

    ngOnInit() {}
    sendService(){
        console.log(this.authForm.value);
    }
}