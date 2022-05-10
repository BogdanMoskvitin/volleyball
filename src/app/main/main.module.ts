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
import { LocationComponent } from './components/location/location.component';
import { HistoryComponent } from './components/history/history.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { UserChangeComponent } from './components/user-change/user-change.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MatIconModule } from '@angular/material/icon';
import { SidebarModule } from 'ng-sidebar';
import { MatButtonModule } from '@angular/material/button';
import { EventsComponent } from './components/events/events.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogContentExampleDialog } from './components/add-event/add-event.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMaskModule } from 'ngx-mask';
import { GuestService } from './services/guest.service';
import { EventChatComponent } from './components/event-chat/event-chat.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SecurityEmailComponent } from './components/security-email/security-email.component';
import { SecurityPasswordComponent } from './components/security-password/security-password.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MapComponent } from './components/map/map.component';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { ProfileComponent } from './components/profile/profile.component';
import { MatRadioModule } from '@angular/material/radio';
import { ProfileDialog } from './components/profile/profile.component';
import { EventDialog } from './components/event/event.component';

const mapConfig: YaConfig = {
  apikey: '9bad155f-f5b0-4d07-b3b3-9edc77b23c73',
  lang: 'ru_RU',
};

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
    PlayerComponent,
    HistoryComponent,
    AboutUsComponent,
    UserChangeComponent,
    ChangePasswordComponent,
    EventsComponent,
    LocationComponent,
    DialogContentExampleDialog,
    EventChatComponent,
    SecurityEmailComponent,
    SecurityPasswordComponent,
    PrivacyPolicyComponent,
    MapComponent,
    ProfileComponent,
    ProfileDialog,
    EventDialog,
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
    MatIconModule,
    SidebarModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatAutocompleteModule,
    NgxMaskModule,
    MatProgressSpinnerModule,
    ImageCropperModule,
    MatRadioModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    RouterModule.forChild([
      {
        path: '', component: HeaderComponent, children: [
          { path: 'events', component: HomeComponent },
          { path: 'event/:id', component: EventComponent },
          { path: 'add-event', component: AddEventComponent },
          { path: 'add-team', component: AddTeamComponent },
          { path: 'players/:id/add-player/:id', component: AddPlayerComponent },
          { path: 'add-location', component: AddLocationComponent },
          { path: 'players/:id', component: PlayersComponent },
          { path: 'locations', component: LocationsComponent },
          { path: 'location/:id', component: LocationComponent },
          { path: 'teams', component: TeamsComponent },
          { path: 'user', component: UserComponent },
          { path: 'players/:id/player/:id', component: PlayerComponent },
          { path: 'history', component: HistoryComponent },
          { path: 'about-us', component: AboutUsComponent },
          { path: 'user-change', component: UserChangeComponent },
          { path: 'change-password', component: ChangePasswordComponent },
          // { path: 'events', component: EventsComponent },
          { path: 'security/email-confirm', component: SecurityEmailComponent },
          { path: 'security/password-reset', component: SecurityPasswordComponent },
          { path: 'privacy-policy', component: PrivacyPolicyComponent },
          { path: 'map', component: MapComponent },
          { path: 'profile', component: ProfileComponent },
        ],
      },
    ])
  ],
  providers: [DatePipe, GuestService]
})
export class MainModule {}