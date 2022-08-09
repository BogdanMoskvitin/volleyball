import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'profile-service-page',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit {

    regForm : FormGroup;
    avatar;
    url:string = environment.apiUrl;
    croppedImage: any = '../../../../assets/img/avatar.jpg';
    meProfile;
    genders = [
        {value: '1', placeholder: 'Мужской', check: true},
        {value: '2', placeholder: 'Женский', check: false}
    ];
    cities;
    addresses;
    city;
    address
    isCity = false;
    controlCity = new FormControl();
    controlAddress = new FormControl();

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private http: HttpClient,
        private datePipe: DatePipe,
        public dialog: MatDialog,
    ) {
        this.regForm = new FormGroup({
            birthday: new FormControl(''),
            gender: new FormControl(''),
            socials: new FormArray([]),
        });
    }

    ngOnInit() {
        this.http.get(this.url + 'me/profile/').subscribe(
            (res) => {
                this.meProfile = res;
                if(this.meProfile.photo) {
                    this.croppedImage = this.meProfile.photo;
                }
            }
        )
    }

    getFormsControls(): FormArray {
        return this.regForm.controls['socials'] as FormArray;
    }

    addSocial() {
        (<FormArray>this.regForm.controls['socials']).push(new FormGroup({
            'social': new FormControl(''),
        }));
    }

    deleteSocial(i){
        (<FormArray> this.regForm.controls['socials']).removeAt(i);
    }

    sendService(){
        let newForm = {
            city: this.city.fias_id,
            address: this.address.fias_id,
            birthday: (this.datePipe.transform(this.regForm.value.birthday, 'yyyy-MM-dd')),
            gender: this.regForm.value.gender,
            vk: '',
            instagram: '',
            youtube: '',
            twitter: '',
            facebook: '',
            telegram: '',
        }
        this.regForm.value.socials.forEach(el => {
            if(el.social.includes('https://')){
                if(el.social.includes('vk.com')) {newForm.vk = el.social}
                if(el.social.includes('instagram.com')) {newForm.instagram = el.social}
                if(el.social.includes('youtube.com')) {newForm.youtube = el.social}
                if(el.social.includes('twitter.com')) {newForm.twitter = el.social}
                if(el.social.includes('facebook.com')) {newForm.facebook = el.social}
                if(el.social.includes('t.me')) {newForm.telegram = el.social}
            } else {
                console.log('Err')
            }
        });
        this.http.patch(this.url + 'me/profile/', newForm).subscribe(res => {
            this.toastr.success('Данные сохранены');
            this.router.navigate(['']);
        }, error => {
            this.toastr.error('Ошибка сохранения')
        })
    }

    openDialog() {
        const dialogRef = this.dialog.open(ProfileDialog);
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
    }

    isTimerCity = true;
    inputCity(event){
        if(this.isTimerCity == true){
            this.isTimerCity = false;
            let interval = setInterval(()=>{
                this.isTimerCity = true;
                this.searchCities(event);
                clearTimeout(interval);
            }, 2000)
        }
        if(event.target.value == "") {
            this.isCity = false;
        }
    }

    changeCity(event) {
        
    }

    saveCity(city) {
        this.city = city;
        this.isCity = true;
    }

    saveAddress(address) {
        this.address = address
    }

    searchCities(event){
        this.cities = [];
        this.http.get(this.url + `dadata/city/?q=${event.target.value}`).subscribe(
            (res) => {
                this.cities = res;
            }
        )
    }

    isTimerAddress = true;
    inputAddress(event){
        if(this.isTimerAddress == true){
            this.isTimerAddress = false;
            let interval = setInterval(()=>{
                this.isTimerAddress = true;
                this.searchAddresses(event);
                clearTimeout(interval);
            }, 2000)
        }
    }

    searchAddresses(event){
        this.addresses = [];
        console.log(this.city.kladr)
        this.http.get(this.url + `dadata/address/?q=${event.target.value}&kladr=${this.city.kladr}`).subscribe(
            (res) => {
                console.log(res)
                this.addresses = res;
            }
        )
    }
}



@Component({
  selector: 'profile-dialog',
  templateUrl: './profile-dialog.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileDialog {
    
    isCrop = false;
    newFile: File = null;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    file: File = null;
    url:string = environment.apiUrl;

    constructor(
        private toastr: ToastrService,
        private http: HttpClient
    ) {}

    fileChangeEvent(event: any): void {
        this.isCrop = !this.isCrop;
        this.imageChangedEvent = event
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
