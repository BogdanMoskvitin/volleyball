import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
    selector: 'register-profile-service-page',
    templateUrl: './register-profile.component.html',
    styleUrls: ['./register-profile.component.scss'],
})

export class RegisterProfileComponent implements OnInit {

    regForm : FormGroup;
    avatar;
    url:string = environment.apiUrl;

    imageChangedEvent: any = '';
    croppedImage: any = '';
    file: File = null;
    newFile: File = null;

    meProfile;

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

    ngOnInit() {
        this.http.get(this.url + 'me/profile/').subscribe(
            (res) => {
                this.meProfile = res;
                this.croppedImage = this.meProfile.photo;
            }
        )
    }

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
            this.router.navigate(['']);
        }, error => {
            this.toastr.error('Ошибка сохранения')
        })
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        this.file = <File>event.target.files[0];
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }
    imageLoaded(
        // image: LoadedImage
        ) {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    sendAvatar(){
        this.newFile = this.dataURLtoFile(this.croppedImage,'photo.jpg');

        var fd = new FormData();
        fd.append('photo', this.newFile, this.newFile.name);

        this.http.patch(this.url + 'me/profile/', fd).subscribe(
            (res) => {
                this.toastr.success('Аватарка сохранена!');
            },
            error => {
                this.toastr.error('Ошибка сохранения');
            });
    }
}