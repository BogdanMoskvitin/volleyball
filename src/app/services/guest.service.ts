import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GuestService {

    guests = new BehaviorSubject([]);

    currentGuests = this.guests.asObservable();

    changeGuests(guest){
        const currentValue = this.guests.value;
        const updatedValue = [...currentValue, guest];
        this.guests.next(updatedValue);
    }
}
