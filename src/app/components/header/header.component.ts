import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MyData } from 'src/app/services/my-data.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'header-service-page',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit, OnDestroy {

    mydata;
    aSub: Subscription;
    aAuth: Boolean;
    isDarkTheme: Observable<boolean>;
    titleTheme = 'Темная тема';

    constructor(
        private myData: MyData,
        private authService: AuthService, 
        private router: Router,
        private themeService: ThemeService) {}
    
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
        this.isDarkTheme = this.themeService.isDarkTheme;
    }

    opened = false;

    toggleSidebar() {
        this.opened = !this.opened;
    }

    logout(event: Event){
        event.preventDefault();
        this.authService.logout();
        this.router.navigate(['./login']).then(() => {
            window.location.reload();
        });
    }

    toggleDarkTheme(checked: boolean) {
        this.themeService.setDarkTheme(checked);
        checked ? this.titleTheme = 'Светлая тема' : this.titleTheme = 'Темная тема';
    }

    ngOnDestroy(){
        this.aSub.unsubscribe();
    }
}