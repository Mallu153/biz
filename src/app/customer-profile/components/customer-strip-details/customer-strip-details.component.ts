import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-customer-strip-details',
  templateUrl: './customer-strip-details.component.html',
  styleUrls: ['./customer-strip-details.component.scss']
})
export class CustomerStripDetailsComponent implements  OnInit {
  @Input() tab1Data: any;
  @Input() tab2Data: any;
  @Input() tab3Data: any;
  showCustomerDetails: any;
  tab1DataOriginal: any; // Store the original Tab 1 data here
  tab2DataOriginal: any; // Store the original Tab 2 data here
  tab3DataOriginal: any; // Store the original Tab 3 data here
  @Output() saveFormData: EventEmitter<any> = new EventEmitter<any>();
  saveButton:Boolean=false;
  constructor() { }



  ngOnInit(): void {

    this.showCustomerDetails = this.tab1Data.profile;
  }




  onEdit() {
    this.saveButton=!this.saveButton;
    this.saveFormData.emit(this.saveButton);
    /* const combinedData = {
      ...this.tab1Data,
      ...this.tab2Data,
      ...this.tab3Data,
    };

    console.log('Data to save:', combinedData); */


    // Reset the edited data after the service calls
   // this.resetEditedData();
  }

  callTab1Api() {
    // Call the tab1 service with this.editedTab1Data
    // Example: this.tab1Service.saveData(this.editedTab1Data);
    console.log('Calling tab1Service with data:', this.tab1Data);

  }

  callTab2Api() {
    // Call the tab2 service with this.editedTab2Data
    // Example: this.tab2Service.saveData(this.editedTab2Data);
    console.log('Calling tab2Service with data:', this.tab2Data);
  }

  callTab3Api() {
    // Call the tab3 service with this.editedTab3Data
    // Example: this.tab3Service.saveData(this.editedTab3Data);
    console.log('Calling tab3Service with data:', this.tab3Data);
  }
/*  if (Object.keys(modifiedTab1Data).length > 0) {
      this.customerApiService.saveTab1Data(modifiedTab1Data).subscribe(
        (response) => {
          // Handle the response from the API if needed
        },
        (error) => {
          console.error('Error saving Tab 1 data:', error);
        }
      );
    }

    // Send data for Tab 2 to the API if there are modified data
    if (Object.keys(modifiedTab2Data).length > 0) {
      this.customerApiService.saveTab2Data(modifiedTab2Data).subscribe(
        (response) => {
          // Handle the response from the API if needed
        },
        (error) => {
          console.error('Error saving Tab 2 data:', error);
        }
      );
    }

    // Send data for Tab 3 to the API if there are modified data
    if (Object.keys(modifiedTab3Data).length > 0) {
      this.customerApiService.saveTab3Data(modifiedTab3Data).subscribe(
        (response) => {
          // Handle the response from the API if needed
        },
        (error) => {
          console.error('Error saving Tab 3 data:', error);
        }
      );
    }
  }
 */

}
