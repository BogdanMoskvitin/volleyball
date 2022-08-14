import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MainService {    

  url:string = environment.apiUrl;
  private dataSource = new BehaviorSubject({id: 4, name: 'г Ставрополь', fias_id: '2a1c7bdb-05ea-492f-9e1c-b3999f79dcbc'});
  currentCity = this.dataSource.asObservable();

  constructor(private http: HttpClient) { }

  changeCity(city) {
    this.dataSource.next(city);
  }

  getMain(city) {
    return this.http.get(this.url + `main?city=${city.id}`)
  }
}