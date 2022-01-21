import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'add-location-service-page',
    templateUrl: './add-location.component.html',
    styleUrls: ['./add-location.component.scss'],
})

export class AddLocationComponent implements OnInit {

    addLocationForm : FormGroup;
    url:string = environment.apiUrl;

    constructor(private http: HttpClient, private router: Router) {
        this.addLocationForm = new FormGroup({
            name: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        });
    }

    ngOnInit() {}

    sendService(){
        return this.http.post(this.url + 'locations/', this.addLocationForm.value)
            .subscribe((res) => {
                this.router.navigateByUrl('main/header/locations');
        });
    }
}