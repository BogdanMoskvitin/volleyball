import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'events-service-page',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})

export class EventsComponent implements OnChanges {
    @Input() events
    @Output() isEvent = new EventEmitter<boolean>(false)
    isEvents: boolean

    constructor(private router: Router) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.events) {
            this.isEvents = false
        } else {
            this.isEvents = true
        }
    }

    openEvent(id) {
        this.router.navigate(['../event', id])
        this.isEvent.emit(true)
    }
}
