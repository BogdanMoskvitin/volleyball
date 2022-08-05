import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'events-service-page',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})

export class EventsComponent implements OnChanges {
    @Input() events;
    isEvents: boolean

    ngOnChanges(changes: SimpleChanges): void {
        if (this.isEmpty(this.events)) {
            this.isEvents = true
        } else {
            this.isEvents = false
        }
    }

    isEmpty(obj) {
        for (let key in obj) {
          return false;
        }
        return true;
    }
}