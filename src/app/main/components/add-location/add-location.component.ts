import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'add-location-service-page',
    templateUrl: './add-location.component.html',
    styleUrls: ['./add-location.component.scss'],
})

export class AddLocationComponent implements OnInit {

    addLocationForm : FormGroup;
    url:string = 'https://api.dev.freeteamcollaboration.ru/';

    constructor(private http: HttpClient, private router: Router) {
        this.addLocationForm = new FormGroup({
            name: new FormControl('', Validators.required),
        });
    }

    ngOnInit() {}

    sendService(){
        return this.http.post(this.url + 'locations/', this.addLocationForm.value)
            .subscribe((res) => {
                console.log(res);
                this.router.navigateByUrl('main/header/locations');
        });
    }
}