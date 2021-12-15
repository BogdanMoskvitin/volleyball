import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mockEvent } from '../../mock/main.mock';
import { Event } from '../../models/event.model';

@Component({
    selector: 'event-service-page',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})

export class EventComponent implements OnInit {

    events:Event[] = mockEvent;
    event;
    id: number;

    constructor(private activateRoute: ActivatedRoute) {
        this.id = activateRoute.snapshot.params['id'];
    }

    ngOnInit() {
        for(let e in this.events){
            if(this.events[e].id == this.id){
                this.event = this.events[e];
            }
        }
    }
}