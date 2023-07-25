import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerProfilesComponent } from './components/customer-profiles/customer-profiles.component';


const routes: Routes = [
  {
    path: 'customer-profiles',
    component: CustomerProfilesComponent
  },
  {
    path: 'customer-profiles/:id',
    component: CustomerProfilesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerProfileRoutingModule { }
