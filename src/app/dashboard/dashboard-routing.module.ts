import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PERMISSION_KEYS } from 'app/shared/config/constants/permission-keys';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes =[
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
          allowedKeys: [PERMISSION_KEYS.DASHBOARD.ESERVICE_ES_SYSTEM_ADMIN]
        }
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
