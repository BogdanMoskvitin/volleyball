import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { EventComponent } from './components/event/event.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddEventComponent,
    AddTeamComponent,
    AddPlayerComponent
  ],
  exports: [
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'event/:id', component: EventComponent
      },
      {
        path: 'add-event', component: AddEventComponent
      },
      {
        path: 'add-team', component: AddTeamComponent
      },
      {
        path: 'add-player', component: AddPlayerComponent
      }
    ])
  ],
  providers: [DatePipe]
})
export class MainModule {
}
