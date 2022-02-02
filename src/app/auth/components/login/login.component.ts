import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'login-service-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit, OnDestroy {
    hide = true;
    authForm : FormGroup;
    aSub: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService
    ) {
        this.authForm = new FormGroup({
            phone_number: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            if (params['registered']) {
                MaterialService.toast('Теперь вы можете зайт и в систему используя свои данные!')
            } else if (params['accessDenied']) {
                MaterialService.toast('Для начала авторизуйтесь в системе!')
            } else if (params['sessionFailed']) {
                MaterialService.toast('Пожалуйста войдите в систему заного!')
            }
        })
    }

    sendService(){
        this.authForm.disable()

        this.aSub = this.authService.login(this.authForm.value).subscribe(
            (res) => {
                this.router.navigate(['/main']).then(() => {
                    window.location.reload();
                  });
            },
            error => {
                this.toastr.error('Данные неверны');
                this.authForm.enable();
                window.location.reload();
            }
        )
    }
    
    ngOnDestroy(){
        if(this.aSub) {
            this.aSub.unsubscribe();
        }
    }
}