import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";

import { ErrorPageComponent } from "./error/error-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { RegisterPageComponent } from './register/register-page.component';


@NgModule({
  imports: [
    CommonModule,
    ContentPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule
  ],
  declarations: [
    ErrorPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ForgotPasswordPageComponent
  ]
})
export class ContentPagesModule { }
