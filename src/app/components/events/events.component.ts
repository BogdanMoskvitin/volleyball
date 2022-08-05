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
        if (this.events.length == 0) {
            this.isEvents = true
        } else {
            this.isEvents = false
        }
    }
}