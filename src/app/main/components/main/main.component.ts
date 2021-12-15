import { Component, OnInit } from '@angular/core';
import { mockEvent } from '../../mock/main.mock';
import { Event } from '../../models/event.model';

@Component({
    selector: 'main-service-page',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {
    events:Event[] = mockEvent;
    constructor() {}
    ngOnInit() {}
}