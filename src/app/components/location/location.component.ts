import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangeLocationComponent } from '../change-location/change-location.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'location-service-page',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})

export class LocationComponent implements OnInit {

    url: string = environment.apiUrl;
    idLocation: number;
    location;

    constructor(
        private http: HttpClient, 
        private activatedRoute: ActivatedRoute,
        public dialog: MatDialog,
        private toastr: ToastrService,
        private router: Router,
    ) {
        this.idLocation = this.activatedRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.getLocation();
    }

    getLocation(){
        this.http.get(this.url + `locations/${this.idLocation}/`)
        .subscribe(res => {
            this.location = res
        })
    }

    changeLocation(location) {
        const dialogRef = this.dialog.open(ChangeLocationComponent, {
            data: {
                location
            }
        })

        dialogRef.afterClosed().subscribe(result => {
            this.getLocation()
        });
    }
}