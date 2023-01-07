import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'events-service-page',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})

export class EventsComponent implements OnChanges, OnInit {
    @Input() events
    @Output() isEvent = new EventEmitter<boolean>(false)
    isEvents: boolean
    isAuth: boolean;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit() {
        if(this.authService.getToken() == null) {
            this.isAuth = false;
        } else {
            this.isAuth = true;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(this.events) {
            if(this.events.length == 0) {
                this.isEvents = true
            } else {
                this.isEvents = false
            }
        }
    }

    openEvent(id) {
        if(this.isAuth) {
            this.router.navigate(['../event', id])
            this.isEvent.emit(true)
        } else {
            return
        }
    }
}
