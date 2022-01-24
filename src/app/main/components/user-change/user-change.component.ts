import { Component, OnInit } from '@angular/core';
import { MyData } from 'src/app/my-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'user-change-service-page',
    templateUrl: './user-change.component.html',
    styleUrls: ['./user-change.component.scss'],
})

export class UserChangeComponent implements OnInit {

    changeForm : FormGroup;
    mydata;

    constructor(private myData: MyData) { }
    
    ngOnInit() {
        this.myData.currentData.subscribe(
            (res) => {
                this.mydata = res;
                this.changeForm = new FormGroup({
                    first_name: new FormControl(this.mydata.first_name, [Validators.required]),
                    last_name: new FormControl(this.mydata.last_name, [Validators.required]),
                    username: new FormControl(this.mydata.email, [Validators.required]),
                    phone_number: new FormControl(this.mydata.phone_number, [Validators.required]),
                });
            }
        );
    }

    sendService(){
        console.log(this.changeForm.value);
    }
}