import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    aSub1: Subscription;
    aSub2: Subscription;

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
        this.aSub1 = this.route.queryParams.subscribe((params: Params) => {
            if (params['registered']) {
            } else if (params['accessDenied']) {
            } else if (params['sessionFailed']) {
            }
        })
    }

    sendService(){
        this.authForm.disable()

        this.aSub2 = this.authService.login(this.authForm.value).subscribe(
            (res) => {
                this.router.navigate(['/main']).then(() => {
                    window.location.reload();
                  });
            },
            error => {
                this.toastr.error(error.error.detail);
                this.authForm.enable();
            }
        )
    }
    
    ngOnDestroy(){
        if(this.aSub1) {
            this.aSub1.unsubscribe();
        }
        if(this.aSub2) {
            this.aSub2.unsubscribe();
        }
    }
}