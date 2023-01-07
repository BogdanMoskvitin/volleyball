import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'change-location-service-page',
    templateUrl: './change-location.component.html',
    styleUrls: ['./change-location.component.scss'],
})

export class ChangeLocationComponent implements OnInit, OnDestroy {

    addLocationForm : FormGroup;
    url:string = environment.apiUrl;
    aSub: Subscription;

    constructor(
        public dialogRef: MatDialogRef<ChangeLocationComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private http: HttpClient, 
        private router: Router,
        private toastr: ToastrService) {
        this.addLocationForm = new FormGroup({
            name: new FormControl(this.data.location.name),
            description: new FormControl(this.data.location.description)
        });
    }

    ngOnInit() {}

    sendService(){
        this.aSub = this.http.patch(this.url + `locations/${this.data.location.id}/`, this.addLocationForm.value).subscribe(
            (res) => {
                this.toastr.success('Место изменено!');
                this.dialogRef.close()
            },
            error => {
                this.toastr.error('Ошибка редактирования места');
            });
    }

    ngOnDestroy() {
        if(this.aSub){
            this.aSub.unsubscribe();
        }
    }
}