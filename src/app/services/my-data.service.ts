import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MyData {    
    private dataSource = new BehaviorSubject({ });
    currentData = this.dataSource.asObservable();
    constructor() { }

    changeData(data) {
        this.dataSource.next(data);
    }
}