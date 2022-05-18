import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MyData } from './services/my-data.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  url:string = environment.apiUrl;

  constructor(
    private auth: AuthService, 
    private router: Router, 
    private http: HttpClient,
    private myData: MyData,
    private toastr: ToastrService
    ) {}

  ngOnInit() {
    const potentialToken = localStorage.getItem('auth-token')
    if(potentialToken !== null) {
      this.auth.setToken(potentialToken);
      this.getEvents();
    }
  }

  getEvents() {
    return this.http.get(this.url + 'me/')
      .subscribe(
        (res) => {
          this.myData.changeData(res);
        }, error => {
          if(error.status == 401) {
            this.router.navigate(['./login']).then(() => {
              this.toastr.warning('Пожалуйста войдите в систему заново')
            })
          }
        }
      );
  }
}
