import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'register-service-page',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit, OnDestroy {

    regForm : FormGroup;
    aSub: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
        this.regForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            phone_number: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit() {}

    sendService(){
        this.regForm.disable();
        this.aSub = this.authService.registration(this.regForm.value).subscribe(
            () => {
                this.router.navigate(['/login'], {
                    queryParams: {
                        registered: true
                    }
                })
            },
            error => {
                MaterialService.toast(error.error.message);
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