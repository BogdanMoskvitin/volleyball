import { Component, OnInit } from '@angular/core';
import { MyData } from 'src/app/services/my-data.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'user-service-page',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})

export class UserComponent implements OnInit {

    mydata;
    url:string = environment.apiUrl;
    avatar: any = '../../../../assets/img/avatar.jpg';

    constructor(private myData: MyData) { }
    
    ngOnInit() {
        this.myData.currentData.subscribe(
            (res) => {
                this.mydata = res;
                console.log(this.mydata)
                if(this.mydata.photo) {
                    this.avatar = this.mydata.photo;
                }
            }
        );
    }
}