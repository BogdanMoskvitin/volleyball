import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImagesService } from 'src/app/services/images.service';

@Component({
    selector: 'add-location-service-page',
    templateUrl: './add-location.component.html',
    styleUrls: ['./add-location.component.scss'],
})

export class AddLocationComponent implements OnInit, OnDestroy {

    addLocationForm : FormGroup;
    url:string = environment.apiUrl;
    aSub: Subscription;
    croppedImage: any = '';
    images$ = new BehaviorSubject([])
    images = []

    constructor(
        public dialogRef: MatDialogRef<AddLocationComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private http: HttpClient, 
        private router: Router,
        private toastr: ToastrService,
        public dialog: MatDialog,
        private imagesService: ImagesService,
    ) {
        this.addLocationForm = new FormGroup({
            name: new FormControl('', Validators.required),
            description: new FormControl('')
        });
    }

    ngOnInit() {}

    sendService(){
        let images = []
        this.images.forEach(res => {
            images.push(res.id)
        })
        let newForm = {
            name: this.addLocationForm.value.name,
            description: this.addLocationForm.value.description,
            lat: this.data.x,
            lon: this.data.y,
            images: images
        }
        this.aSub = this.http.post(this.url + 'locations/', newForm).subscribe(
            (res) => {
                this.toastr.success('Место создано!');
            },
            error => {
                this.toastr.error('Ошибка создания места');
            });
    }

    openDialog() {
        const dialogRef = this.dialog.open(ImagesDialog);
    
        dialogRef.afterClosed().subscribe(() => {
            this.imagesService.currentImages.subscribe((res) => {
                this.images$.next(res)
                this.images = res
            })
        })
    }

    ngOnDestroy() {
        if(this.aSub){
            this.aSub.unsubscribe();
        }
    }
}



@Component({
    selector: 'images-dialog',
    templateUrl: './images-dialog.html',
    styleUrls: ['./add-location.component.scss'],
  })
  export class ImagesDialog {
      
      isCrop = false;
      newFile: File = null;
      imageChangedEvent: any = '';
      croppedImage: any = '';
      file: File = null;
      url:string = environment.apiUrl;
      name: string
  
      constructor(
          private toastr: ToastrService,
          private http: HttpClient,
          private imagesService: ImagesService,
      ) {}
  
      fileChangeEvent(event: any): void {
        this.name = event.target.value.split('\\')[2]
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
          this.newFile = this.dataURLtoFile(this.croppedImage,this.name);
          var fd = new FormData();
          fd.append('file', this.newFile, this.newFile.name);

        this.http.post(this.url + 'files/', fd).subscribe(
            (res) => {
                this.toastr.success('Картинка сохранена!');
                this.imagesService.changeImages(res)
            },
            error => {
                this.toastr.error('Ошибка сохранения');
            }
        )
      }
  }
  