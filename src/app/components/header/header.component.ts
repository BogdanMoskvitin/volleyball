import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MyData } from 'src/app/services/my-data.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MainService } from 'src/app/services/main.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'header-service-page',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

    mydata;
    aAuth: Boolean;
    isDarkTheme;
    titleTheme = 'Темная тема';
    selectCity;

    constructor(
        private myData: MyData,
        private authService: AuthService, 
        private router: Router,
        private themeService: ThemeService,
        private mainService: MainService,
        public dialog: MatDialog,
    ) {
        themeService.isDarkTheme.subscribe(res => {
            this.isDarkTheme = res
        })
    }
    
    ngOnInit() {
        if(this.authService.getToken() == null) {
            this.aAuth = false;
        } else {
            this.aAuth = true;
        }
        this.myData.currentData.subscribe(
            (res) => {
                this.mydata = res;
                if(this.mydata.city) {
                    this.mainService.changeCity(this.mydata.city)
                } else {
                    this.mainService.changeCity({id: 4, short_name: 'г Ставрополь'})
                }
            }
        );
        this.mainService.currentCity.subscribe((res) => {
            this.selectCity = res
        })
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

    openDialog() {
        this.dialog.open(DialogCityComponent)
    }
}

@Component({
    selector: 'dialog-city',
    templateUrl: './dialog-city.component.html',
    styleUrls: ['./header.component.scss'],
})
export class DialogCityComponent implements OnInit {
    url:string = environment.apiUrl;
    cities;
    controlCity = new FormControl();

    constructor(
        private http: HttpClient,
        private mainService: MainService,
        public dialog: MatDialog,
    ){ }

    ngOnInit() { }

    sendCity(city) {
        if(!city.status) {
            this.mainService.changeCity(city)
            this.dialog.closeAll()
        }
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
                if(this.cities.length == 0) {
                    this.cities = [{name: 'Ничего не найдено', status: 'disabled'}]
                }
            }
        )
    }
}