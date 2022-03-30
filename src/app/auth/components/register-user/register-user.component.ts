import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'register-user-service-page',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.scss'],
})

export class RegisterUserComponent implements OnInit {

    regForm : FormGroup;

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private http: HttpClient
    ) {
        this.regForm = new FormGroup({
            first_name: new FormControl('', [Validators.required]),
            last_name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit() {}

    sendService(){
        console.log(this.regForm.value);
        this.http.patch('', this.regForm.value).subscribe(res => {
            this.toastr.success('Данные сохранены');
            this.router.navigate(['/auth/register-profile']);
        }, error => {
            this.toastr.error('Ошибка сохранения')
        })
    }
}