import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MyData } from 'src/app/my-data.service';

@Component({
    selector: 'user-service-page',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})

export class UserComponent implements OnInit, OnDestroy {

    mydata;
    aSub: Subscription;

    constructor(
        private myData: MyData,
        private auth: AuthService,
        private router: Router) {}
    
    ngOnInit() {
        this.aSub = this.myData.currentData.subscribe(
            (res) => {
                this.mydata = res;
            }
        );
    }

    logout(event: Event){
        event.preventDefault();
        this.auth.logout();
        this.router.navigate(['/auth'])
    }

    ngOnDestroy(){
        this.aSub.unsubscribe();
    }
}