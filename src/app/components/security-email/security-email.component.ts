import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'security-email-service-page',
    templateUrl: './security-email.component.html',
    styleUrls: ['./security-email.component.scss'],
})

export class SecurityEmailComponent implements OnInit {

    url:string = environment.apiUrl;
    token:string;

    constructor(
        private http: HttpClient, 
        private router: Router,
        private toastr: ToastrService) {
        this.token = document.location.search.slice(7);
    }

    ngOnInit() {
        this.http.post(this.url + `me/check-email-confirm/${this.token}/`, '').subscribe(
            (res) => {
                this.toastr.success('Почта подтверждена!');
                this.router.navigateByUrl('');
            },
            error => {
                this.toastr.error('Ошибка подтверждения');
            });
    }
}