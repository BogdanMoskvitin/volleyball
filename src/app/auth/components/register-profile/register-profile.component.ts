import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'register-profile-service-page',
    templateUrl: './register-profile.component.html',
    styleUrls: ['./register-profile.component.scss'],
})

export class RegisterProfileComponent implements OnInit {

    regForm : FormGroup;
    // form: Profile = { } as Profile;
    avatar;
    file;
    url:string = environment.apiUrl;

    genders = [
        {value: '1', placeholder: 'Мужской', check: true},
        {value: '2', placeholder: 'Женский', check: false}
    ];

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private http: HttpClient,
        private datePipe: DatePipe, 
    ) {
        this.regForm = new FormGroup({
            // avatar: new FormControl('', [Validators.required, this.fileJpgValidator]),
            birthday: new FormControl(''),
            gender: new FormControl(''),
            vk: new FormControl(''),
            instagram: new FormControl(''),
            youtube: new FormControl(''),
            twitter: new FormControl(''),
            facebook: new FormControl(''),
            telegram: new FormControl(''),
        });
    }

    ngOnInit() {}
    
    // .jpg валидатор
    // fileJpgValidator(control: FormControl): {[s: string]: boolean}|null {
    //     if (!control.value.includes('.JPG')) {
    //         return {'': true};
    //     }
    //     return null;
    // }

    // onFileSelected(event) {
    //     this.file = event.target.files[0];
    //     let reader = new FileReader();
    //     reader.onload = ev => {
    //         this.avatar = ev.target.result;
    //     }
    //     reader.readAsDataURL(this.file)
    // }

    // constructForm(){
    //     this.form.avatar = this.file;
    //     this.form.city = this.regForm.value.city;
    //     this.form.age = this.regForm.value.age;
    //     this.form.instagram = this.regForm.value.instagram;
    //     this.form.vk = this.regForm.value.vk;
    //     this.form.telegram = this.regForm.value.telegram;
    //     this.sendService();
    // }

    sendService(){
        let newForm = {
            birthday: (this.datePipe.transform(this.regForm.value.birthday, 'yyyy-MM-dd')),
            gender: this.regForm.value.gender,
            vk: this.regForm.value.vk,
            instagram: this.regForm.value.instagram,
            youtube: this.regForm.value.youtube,
            twitter: this.regForm.value.twitter,
            facebook: this.regForm.value.facebook,
            telegram: this.regForm.value.telegram,
        }
        this.http.patch(this.url + 'me/profile/', newForm).subscribe(res => {
            this.toastr.success('Данные сохранены');
            this.router.navigate(['../main']);
        }, error => {
            this.toastr.error('Ошибка сохранения')
        })
    }
}