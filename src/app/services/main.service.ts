import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MainService {    

  url:string = environment.apiUrl;
  private dataSource = new Subject();
  currentCity = this.dataSource.asObservable();

  constructor(private http: HttpClient) { }

  changeCity(city) {
    this.dataSource.next(city);
  }

  getMain(city) {
    return this.http.get(this.url + `main?city=${city.id}`)
  }
}