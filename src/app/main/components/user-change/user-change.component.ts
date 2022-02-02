import { Component, OnInit } from '@angular/core';
import { MyData } from 'src/app/my-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'user-change-service-page',
    templateUrl: './user-change.component.html',
    styleUrls: ['./user-change.component.scss'],
})

export class UserChangeComponent implements OnInit {

    changeForm : FormGroup;
    mydata;
    url:string = environment.apiUrl;
    id: number;

    constructor(
        private myData: MyData,
        private http: HttpClient,
        private toastr: ToastrService
    ) { }
    
    ngOnInit() {
        this.myData.currentData.subscribe(
            (res) => {
                this.mydata = res;
                this.id = this.mydata.id;
                this.changeForm = new FormGroup({
                    first_name: new FormControl(this.mydata.first_name),
                    last_name: new FormControl(this.mydata.last_name),
                    email: new FormControl(this.mydata.email),
                    phone_number: new FormControl(this.mydata.phone_number),
                });
            }
        );
    }

    sendService(){
        return this.http.patch(this.url + `auth/users/${this.id}`, this.changeForm.value).subscribe(
            (res) => {
                this.toastr.success('Данные изменены!');
                window.location.reload();
            },
            error => {
                this.toastr.error('Ошибка изменения данных');
            });
    }
}