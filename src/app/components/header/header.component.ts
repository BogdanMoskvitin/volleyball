import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MyData } from 'src/app/services/my-data.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MainService } from 'src/app/services/main.service';
import { MatDialog } from '@angular/material/dialog';
import { Theme, ThemeService } from '../../shared/theme.service';
import { StyleManager } from '../../shared/style-manager';
import { LocalStorageService } from '../../shared/local-storage.service';

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
    themes: Theme[];
    selectedTheme: Theme;

    constructor(
        private myData: MyData,
        private authService: AuthService, 
        private router: Router,
        private themeService: ThemeService,
        private mainService: MainService,
        public dialog: MatDialog,
        public styleManager: StyleManager,
        private localStorage: LocalStorageService
    ) {
        this.themes = themeService.themes;

        const themeName = this.localStorage.getValue(LocalStorageService.themeKey);

        if (themeName) {
        this.selectedTheme = this.selectTheme(themeName);
        } else {
        this.selectedTheme = this.selectTheme(ThemeService.defaultTheme.name);
        }
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
    
    selectTheme(themeName: string): Theme {
        themeName == 'light-theme' ? this.isDarkTheme = true : this.isDarkTheme = false;
        const theme = this.themeService.findTheme(themeName);
    
        if (theme) {
          this.themeService.updateTheme(theme);
          this.styleManager.removeStyle('theme');
          this.styleManager.setStyle('theme', `${theme.name}.css`);
          this.localStorage.store(LocalStorageService.themeKey, theme.name);
    
          return theme;
        }
    
        return ThemeService.defaultTheme;
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
            this.http.patch(this.url + `me/profile/`, {city: city.fias_id}).subscribe()
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