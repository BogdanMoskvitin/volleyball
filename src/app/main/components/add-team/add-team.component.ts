import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
    selector: 'add-team-service-page',
    templateUrl: './add-team.component.html',
    styleUrls: ['./add-team.component.scss'],
})

export class AddTeamComponent implements OnInit, OnDestroy {

    addTeamForm : FormGroup;
    url:string = environment.apiUrl;
    events;
    aSub: Subscription;

    constructor(
        private http: HttpClient, 
        private router: Router,
        private toastr: ToastrService) {
        this.addTeamForm = new FormGroup({
            full_name: new FormControl('', Validators.required),
            short_name: new FormControl('', Validators.required),
        });
    }

    ngOnInit() {}

    sendService(){
        this.aSub = this.http.post(this.url + 'teams/all/', this.addTeamForm.value).subscribe(
            (res) => {
                this.toastr.success('Команда создана!');
                this.router.navigateByUrl('main/header/teams');
            },
            error => {
                this.toastr.error('Ошибка создания команды');
            });
    }

    ngOnDestroy(){
        if(this.aSub){
            this.aSub.unsubscribe();
        }
    }
}