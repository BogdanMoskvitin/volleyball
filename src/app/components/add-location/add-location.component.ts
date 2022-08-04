import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'add-location-service-page',
    templateUrl: './add-location.component.html',
    styleUrls: ['./add-location.component.scss'],
})

export class AddLocationComponent implements OnInit, OnDestroy {

    addLocationForm : FormGroup;
    url:string = environment.apiUrl;
    aSub: Subscription;

    constructor(
        public dialogRef: MatDialogRef<AddLocationComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private http: HttpClient, 
        private router: Router,
        private toastr: ToastrService) {
        this.addLocationForm = new FormGroup({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {}

    sendService(){
        let newForm = {
            name: this.addLocationForm.value.name,
            description: this.addLocationForm.value.description,
            lat: this.data.x,
            lon: this.data.y
        }
        this.aSub = this.http.post(this.url + 'locations/', newForm).subscribe(
            (res) => {
                this.toastr.success('Место создано!');
            },
            error => {
                this.toastr.error('Ошибка создания места');
            });
    }

    ngOnDestroy() {
        if(this.aSub){
            this.aSub.unsubscribe();
        }
    }
}