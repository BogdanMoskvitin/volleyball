import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'add-team-service-page',
    templateUrl: './add-team.component.html',
    styleUrls: ['./add-team.component.scss'],
})

export class AddTeamComponent implements OnInit {

    addTeamForm : FormGroup;
    url:string = 'https://api.dev.freeteamcollaboration.ru/';
    events;

    constructor(private http: HttpClient, private datePipe: DatePipe) {
        this.addTeamForm = new FormGroup({
            full_name: new FormControl('', Validators.required),
        });
    }

    ngOnInit() {}

    sendService(){
        return this.http.post(this.url + 'teams/', this.addTeamForm.value)
            .subscribe((res) => {
                console.log(res);
        });
    }
}