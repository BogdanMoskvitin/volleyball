import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MyData } from 'src/app/my-data.service';

@Component({
    selector: 'header-service-page',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit, OnDestroy {

    mydata;
    aSub: Subscription;
    aAuth: Boolean;

    constructor(
        private myData: MyData,
        private authService: AuthService, 
        private router: Router) {}
    
    ngOnInit() {
        if(this.authService.getToken() == null) {
            this.aAuth = false;
        } else {
            this.aAuth = true;
        }
        this.aSub = this.myData.currentData.subscribe(
            (res) => {
                this.mydata = res;
            }
        );
    }

    opened = false;

    toggleSidebar() {
        this.opened = !this.opened;
    }

    logout(event: Event){
        event.preventDefault();
        this.authService.logout();
        this.router.navigate(['/auth'])
    }

    ngOnDestroy(){
        this.aSub.unsubscribe();
    }
}