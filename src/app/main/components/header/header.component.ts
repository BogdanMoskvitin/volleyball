import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'header-service-page',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

    constructor() {}
    
    ngOnInit() {}

    opened = false;

    toggleSidebar() {
        this.opened = !this.opened;
    }
}