import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';

@Component({
    selector: 'main-service-page',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit, OnDestroy {

    main
    events
    locations
    url:string = environment.apiUrl;
    aSub: Subscription;
    spinner = true;

    coords;
    isLocation = false;

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
        private mainService: MainService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}
    
    ngOnInit(): void {
        let city
        this.mainService.currentCity.subscribe(res => {
            city = res
            this.mainService.getMain(city)
            .subscribe((res) => {
                this.main = res;
                this.events = this.main.events
                this.locations = this.main.locations
                this.spinner = false
            })
        })
    }

    ngOnDestroy(){
        this.aSub.unsubscribe();
    }
}