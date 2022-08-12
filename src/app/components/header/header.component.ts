import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MyData } from 'src/app/services/my-data.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MainService } from 'src/app/services/main.service';

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
    url:string = environment.apiUrl;
    cities;
    controlCity = new FormControl();

    constructor(
        private myData: MyData,
        private authService: AuthService, 
        private router: Router,
        private themeService: ThemeService,
        private http: HttpClient,
        private mainService: MainService
    ) {}
    
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

    sendCity(city) {
        console.log(city)
        this.mainService.changeCity(city)
    }

    isTimerCity = true;
    inputCity(event){
        if(this.isTimerCity == true){
            this.isTimerCity = false;
            let interval = setInterval(()=>{
                this.isTimerCity = true;
                this.searchCities(event);
                clearTimeout(interval);
            }, 2000)
        }
    }
    searchCities(event){
        this.cities = [];
        this.http.get(this.url + `dict/cities/?search=${event.target.value}`).subscribe(
            (res) => {
                this.cities = res;
            }
        )
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