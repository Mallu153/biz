import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';

import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularResizedEventModule } from 'angular-resize-event';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    MatchHeightModule,
    AngularResizedEventModule
  ]
})
export class DashboardModule { }
