import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DefineDocumentsPopupComponent } from '../define-documents-popup/define-documents-popup.component';
import { CustomerApiService } from 'app/customer-profile/services/customer-api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Customer_Basic_Details } from 'app/customer-profile/constants/custom-api-url';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-documents',
  templateUrl: './customer-documents.component.html',
  styleUrls: ['./customer-documents.component.scss']
})
export class CustomerDocumentsComponent implements OnInit, OnDestroy {
  @Input() patchDocumentData: any;
  @Output() tab4Data = new EventEmitter<any>();
  private ngUnSubscribe = new Subject<void>();
  id: any;
  closeResult = '';
  documentData: any[] = [];

  constructor(
    private modalService: NgbModal,
    private customerApiService: CustomerApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.ngUnSubscribe)).subscribe((params) => {
      if (params && params.id) {
        this.id = atob(unescape(params.id));
        if (this.id) {
          this.findDocumentById(this.id);
        }
      }
    });
  }

  findDocumentById(id: any): void {
    this.customerApiService.findCreateProfileById(this.id, Customer_Basic_Details.findDocuments)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(
        (res) => {
          if (res && res.status === 200 && res.data) {
            this.documentData = res.data;
          } else {
            this.documentData = [];
          }
        },
        (error) => {
          console.error('Error fetching document data:', error);
          this.documentData = [];
        }
      );
  }

  openMaximizePopup(): void {
    const modalRef: NgbModalRef = this.modalService.open(DefineDocumentsPopupComponent, {
      size: 'lg' // Set the desired size of the popup (e.g., 'sm', 'md', 'lg', 'xl')
    });
    modalRef.componentInstance.bizProfileNumber = this.id; // Update to 'this.id' instead of 'this.documentData'
    // If you want to do something when the popup is closed (e.g., handle result or clean up), you can subscribe to the 'result' event
    modalRef.result.then(
      (result) => {
        // Handle the result here if needed
        console.log('Modal closed with result:', result);
      },
      (reason) => {
        // Handle the reason here if the modal was dismissed (e.g., clicked outside or pressed Esc)
        console.log('Modal dismissed with reason:', reason);
      }
    );
  }

  onEditClick(data: any): void {
    // Open the modal with the 'data' to edit
    const modalRef = this.modalService.open(DefineDocumentsPopupComponent, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });

    // Pass the 'patchDocumentData' to the modal component
    modalRef.componentInstance.patchDocumentData = { ...data };
    modalRef.componentInstance.bizProfileNumber = this.id; // Update to 'this.id' instead of 'this.documentData'

    // Subscribe to the 'patchData' event emitted by the popup
    modalRef.componentInstance.tab4Data.subscribe((patchedData) => {
      // Update the corresponding document in the 'documentData' array with the patched data
      const index = this.documentData.findIndex((doc) => doc.documentId === patchedData.documentId);
      if (index !== -1) {
        this.documentData[index] = { ...patchedData };
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
