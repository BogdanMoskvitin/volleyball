import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyData } from 'src/app/my-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

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

    ngOnDestroy(){
        this.aSub1.unsubscribe();
        if(this.aSub2){
            this.aSub2.unsubscribe();
        }
    }
}