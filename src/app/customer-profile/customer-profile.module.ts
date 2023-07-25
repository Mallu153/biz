import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerProfileRoutingModule } from './customer-profile-routing.module';
import { CustomerProfilesComponent } from './components/customer-profiles/customer-profiles.component';
import { CustomerBasicDetailsComponent } from './components/customer-profiles/customer-basic-details/customer-basic-details.component';
import { CustomerAdditionalDetailsComponent } from './components/customer-profiles/customer-additional-details/customer-additional-details.component';
import { CustomerEmergencyContactComponent } from './components/customer-profiles/customer-emergency-contact/customer-emergency-contact.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerStripDetailsComponent } from './components/customer-strip-details/customer-strip-details.component';
import { CustomerAdditionalAddressComponent } from './components/customer-profiles/customer-additional-address/customer-additional-address.component';
import { CustomerDocumentsComponent } from './components/customer-profiles/customer-documents/customer-documents.component';
import { DefineDocumentsPopupComponent } from './components/customer-profiles/define-documents-popup/define-documents-popup.component';


@NgModule({
  declarations: [
    CustomerProfilesComponent,
    CustomerBasicDetailsComponent,
    CustomerAdditionalDetailsComponent,
    CustomerEmergencyContactComponent,
    CustomerDetailsComponent,
    CustomerStripDetailsComponent,
    CustomerAdditionalAddressComponent,
    CustomerDocumentsComponent,
    DefineDocumentsPopupComponent

  ],
  imports: [
    CommonModule,
    CustomerProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDatatableModule

  ]
})
export class CustomerProfileModule { }
