import { CommonModule, DatePipe } from '@angular/common';
import { EventsComponent } from './components/events/events.component';
import { EventComponent } from './components/event/event.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { TeamsComponent } from './components/teams/teams.component';
import { DialogCityComponent, HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';
import { AboutComponent } from './components/about/about.component';
import { UserChangeComponent } from './components/user-change/user-change.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SidebarModule } from 'ng-sidebar';
import { DialogContentExampleDialog } from './components/add-event/add-event.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { GuestService } from './services/guest.service';
import { EventChatComponent } from './components/event-chat/event-chat.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SecurityEmailComponent } from './components/security-email/security-email.component';
import { SecurityPasswordComponent } from './components/security-password/security-password.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { ProfileComponent } from './components/profile/profile.component';
import { MatRadioModule } from '@angular/material/radio';
import { ProfileDialog } from './components/profile/profile.component';
import { EventDialog } from './components/event/event.component';
import { ThemeService } from './services/theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterProfileComponent } from './components/register-profile/register-profile.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegisterProfileDialog } from './components/register-profile/register-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './classes/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { TeamComponent } from './components/team/team.component';
import { LocationComponent } from './components/location/location.component';
import { DialogEventsComponent, MapComponent } from './components/map/map.component';
import { MainComponent } from './components/main/main.component';
import { MainService } from './services/main.service';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const mapConfig: YaConfig = {
  apikey: '9bad155f-f5b0-4d07-b3b3-9edc77b23c73',
  lang: 'ru_RU',
};

const appRoutes: Routes = [
  {
    path: '', component: HeaderComponent, children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainComponent },
      { path: 'event/:id', component: EventComponent },
      { path: 'add-event', component: AddEventComponent },
      { path: 'add-team', component: AddTeamComponent },
      { path: 'add-player', component: AddPlayerComponent },
      { path: 'add-location', component: AddLocationComponent },
      { path: 'team/:id', component: TeamComponent },
      { path: 'teams', component: TeamsComponent },
      { path: 'user', component: UserComponent },
      { path: 'about', component: AboutComponent },
      { path: 'user-change', component: UserChangeComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'security/email-confirm', component: SecurityEmailComponent },
      { path: 'security/password-reset', component: SecurityPasswordComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'register-profile', component: RegisterProfileComponent },
      { path: 'location/:id', component: LocationComponent },
    ],
  },
  { path: '**', component: EventsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    AddEventComponent,
    AddTeamComponent,
    AddPlayerComponent,
    AddLocationComponent,
    EventComponent,
    TeamsComponent,
    HeaderComponent,
    UserComponent,
    AboutComponent,
    UserChangeComponent,
    ChangePasswordComponent,
    DialogContentExampleDialog,
    EventChatComponent,
    SecurityEmailComponent,
    SecurityPasswordComponent,
    PrivacyPolicyComponent,
    ProfileComponent,
    ProfileDialog,
    EventDialog,
    LoginComponent,
    RegisterComponent,
    RegisterProfileComponent,
    RegisterProfileDialog,
    TeamComponent,
    DialogEventsComponent,
    LocationComponent,
    MapComponent,
    MainComponent,
    DialogCityComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    SidebarModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    ImageCropperModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor }, 
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    DatePipe, GuestService, ThemeService, MainService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
