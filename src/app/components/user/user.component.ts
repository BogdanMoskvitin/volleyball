import { HttpClient } from '@angular/common/http';
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
    meProfile

    constructor(private myData: MyData, private http: HttpClient) { }
    
    ngOnInit() {
        this.myData.currentData.subscribe(
            (res) => {
                this.mydata = res;
                console.log(this.mydata)
                if(this.mydata.photo) {
                    this.avatar = this.mydata.photo;
                }
            }
        )
        this.http.get(this.url + 'me/profile/').subscribe(
            (res) => {
                this.meProfile = res;
                if(this.meProfile.photo) {
                    this.avatar = this.meProfile.photo;
                }
            }
        )
    }
}