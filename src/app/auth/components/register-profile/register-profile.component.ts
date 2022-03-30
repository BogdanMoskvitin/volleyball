import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

export interface Profile {
    avatar: {},
    city: string,
    age: number,
    instagram: string,
    vk: string,
    telegram: string,
}

@Component({
    selector: 'register-profile-service-page',
    templateUrl: './register-profile.component.html',
    styleUrls: ['./register-profile.component.scss'],
})

export class RegisterProfileComponent implements OnInit {

    regForm : FormGroup;
    form: Profile = { } as Profile;
    avatar;
    file;


    constructor(
        private router: Router,
        private toastr: ToastrService,
        private http: HttpClient
    ) {
        this.regForm = new FormGroup({
            avatar: new FormControl('', [Validators.required, this.fileJpgValidator]),
            city: new FormControl(''),
            age: new FormControl(''),
            instagram: new FormControl(''),
            vk: new FormControl(''),
            telegram: new FormControl(''),
        });
    }

    ngOnInit() {}
    
    // .jpg валидатор
    fileJpgValidator(control: FormControl): {[s: string]: boolean}|null {
        if (!control.value.includes('.JPG')) {
            return {'': true};
        }
        return null;
    }

    onFileSelected(event) {
        this.file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = ev => {
            this.avatar = ev.target.result;
        }
        reader.readAsDataURL(this.file)
    }

    constructForm(){
        this.form.avatar = this.file;
        this.form.city = this.regForm.value.city;
        this.form.age = this.regForm.value.age;
        this.form.instagram = this.regForm.value.instagram;
        this.form.vk = this.regForm.value.vk;
        this.form.telegram = this.regForm.value.telegram;
        this.sendService();
    }

    sendService(){
        console.log(this.form);
        this.http.patch('', this.form).subscribe(res => {
            this.toastr.success('Данные сохранены');
            this.router.navigate(['../main']);
        }, error => {
            this.toastr.error('Ошибка сохранения')
        })
    }
}