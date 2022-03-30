import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RegisterProfileComponent } from './components/register-profile/register-profile.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterUserComponent,
    RegisterProfileComponent,
  ],
  exports: [
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    NgxMaskModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'register-user', component: RegisterUserComponent
      },
      {
        path: 'register-profile', component: RegisterProfileComponent
      },
    ])
  ],
  providers: []
})
export class AuthModule {
}
