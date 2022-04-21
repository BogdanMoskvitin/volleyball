import { Component, OnInit } from '@angular/core';
import { MyData } from 'src/app/my-data.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'user-service-page',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})

export class UserComponent implements OnInit {

    mydata;
    url:string = environment.apiUrl;

    constructor(private myData: MyData) { }
    
    ngOnInit() {
        this.myData.currentData.subscribe(
            (res) => {
                this.mydata = res;
            }
        );
    }
}