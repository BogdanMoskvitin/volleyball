import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { MyData } from './my-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  url:string = environment.apiUrl;

  constructor(
    private auth: AuthService, 
    private router: Router, 
    private http: HttpClient,
    private myData: MyData
    ) {}

  ngOnInit() {
      const potentialToken = localStorage.getItem('auth-token')
      if(potentialToken !== null) {
        this.auth.setToken(potentialToken);
      }
      this.getEvents();
  }

  logout(event: Event){
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/auth'])
  }

  getEvents() {
      return this.http.get(this.url + 'auth/users/me/')
          .subscribe((res) => {
            this.myData.changeData(res);
      });
  }
}
