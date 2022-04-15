import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyData } from 'src/app/my-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
    selector: 'user-service-page',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})

export class UserComponent implements OnInit, OnDestroy {

    changeForm : FormGroup;
    mydata;
    url:string = environment.apiUrl;
    id: number;
    aSub1: Subscription;
    aSub2: Subscription;

    imageChangedEvent: any = '';
    croppedImage: any = '';
    file: File = null;
    newFile: File = null;

    meProfile;

    constructor(
        private myData: MyData,
        private http: HttpClient,
        private toastr: ToastrService
    ) { }
    
    ngOnInit() {
        this.aSub1 = this.myData.currentData.subscribe(
            (res) => {
                this.mydata = res;
                this.id = this.mydata.id;
                this.changeForm = new FormGroup({
                    first_name: new FormControl(this.mydata.first_name),
                    last_name: new FormControl(this.mydata.last_name),
                    username: new FormControl(this.mydata.username),
                });
            }
        );
        this.http.get(this.url + 'me/profile/').subscribe(
            (res) => {
                this.meProfile = res;
                this.croppedImage = this.meProfile.photo;
            }
        )
    }

    sendService(){
        this.aSub2 = this.http.patch(this.url + `me/`, this.changeForm.value).subscribe(
            (res) => {
                this.toastr.success('Данные изменены!');
                window.location.reload();
            },
            error => {
                this.toastr.error('Ошибка изменения данных');
            });
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

    ngOnDestroy(){
        this.aSub1.unsubscribe();
        if(this.aSub2){
            this.aSub2.unsubscribe();
        }
    }
}