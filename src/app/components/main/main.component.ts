import { Component, OnDestroy, OnInit, AfterViewInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'main-service-page',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit, AfterViewInit, OnDestroy {

    events;
    url:string = environment.apiUrl;
    aSub: Subscription;
    spinner: boolean;

    coords;
    isLocation = false;

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}
    
    ngOnInit(): void {
        this.spinner = true;
        this.getEvents();
    }

    ngAfterViewInit(): void {
        this.spinner = false;
    }

    getEvents() {
        this.aSub = this.http.get(this.url + 'events/group-by-date?multi_status=1,2,3')
            .subscribe((res) => {
                this.events = res;
        });
    }

    ngOnDestroy(){
        this.aSub.unsubscribe();
    }
}