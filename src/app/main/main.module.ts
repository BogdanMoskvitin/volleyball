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
import { AddLocationComponent } from './components/add-location/add-location.component';
import { PlayersComponent } from './components/players/players.component';
import { LocationsComponent } from './components/locations/locations.component';
import { TeamsComponent } from './components/teams/teams.component';
import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';
import { PlayerComponent } from './components/player/player.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddEventComponent,
    AddTeamComponent,
    AddPlayerComponent,
    AddLocationComponent,
    EventComponent,
    PlayersComponent,
    LocationsComponent,
    TeamsComponent,
    HeaderComponent,
    UserComponent,
    PlayerComponent
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
        redirectTo: 'header',
        pathMatch: 'full'
      },
      {
        path: 'header', component: HeaderComponent, children: [
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
            path: 'players/:id/add-player/:id', component: AddPlayerComponent
          },
          {
            path: 'add-location', component: AddLocationComponent
          },
          {
            path: 'players/:id', component: PlayersComponent
          },
          {
            path: 'locations', component: LocationsComponent
          },
          {
            path: 'teams', component: TeamsComponent
          },
          {
            path: 'user', component: UserComponent
          },
          {
            path: 'players/:id/player/:id', component: PlayerComponent
          }
        ]
      },
    ])
  ],
  providers: [DatePipe]
})
export class MainModule {
}
