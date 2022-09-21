import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ImagesService {

    images = new BehaviorSubject([]);

    currentImages = this.images.asObservable();

    changeImages(image){
        const currentValue = this.images.value;
        const updatedValue = [...currentValue, image];
        this.images.next(updatedValue);
    }
}
