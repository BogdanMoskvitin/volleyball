import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
    selector: 'about-service-page',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})

export class AboutComponent implements OnInit {

    isDarkTheme: boolean;

    constructor(private themeService: ThemeService) {}

    ngOnInit(): void {
        this.themeService.isDarkTheme.subscribe(res => {
            this.isDarkTheme = res;
        })
    }

}