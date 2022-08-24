import { Component, Input } from '@angular/core';

@Component({
    selector: 'image-carousel-service-page',
    templateUrl: './image-carousel.component.html',
    styleUrls: ['./image-carousel.component.scss'],
})

export class ImageCarouselComponent {

  @Input() speed
  @Input() images
  @Input() width
  @Input() height

  left = 0

  constructor() { }

  next() {
    if((this.images.length-1) * this.width > -this.left) {
      this.left -= this.width
    } else {
      this.left = 0
    }
    this.getStyle(this.speed)
  }

  back() {
    if(this.left == 0) {
      this.left = (this.images.length-1) * -this.width
    } else {
      this.left += this.width
    }
    this.getStyle(this.speed)
  }

  getStyle(speed) {
    return {
      'left': this.left + 'px', 
      'transition': 'left ' + speed + 's' 
    }
  }
}