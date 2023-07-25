import { StorageService } from './../../../../shared/services/storage.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer_Basic_Details } from 'app/customer-profile/constants/custom-api-url';
import { CustomerApiService } from 'app/customer-profile/services/customer-api.service';
import { UserResponse } from 'app/shared/models/login-response';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-define-documents-popup',
  templateUrl: './define-documents-popup.component.html',
  styleUrls: ['./define-documents-popup.component.scss']
})
export class DefineDocumentsPopupComponent implements OnInit, OnDestroy {
  PageTitle= 'Documents'
  @Input() patchDocumentData: any;
  @Input() bizProfileNumber: number;
  @Output() tab4Data: EventEmitter<any> = new EventEmitter<any>();
  documentsForm: FormGroup;
  submitted: boolean = false;
  isEdit: boolean = false;
  user: UserResponse;
  id: any;
  private ngUnSubscribe: Subject<void>;

  constructor(
    public activeModal: NgbActiveModal,
    private fb :FormBuilder,
    private storageService: StorageService,
    private customerApiService: CustomerApiService,
    private titleService: Title,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  //  console.log(this.bizProfileNumber)
    this.ngUnSubscribe = new Subject<void>();
    this.user = this.storageService.getUser();
   /*  this.route.params.pipe(takeUntil(this.ngUnSubscribe)).subscribe((params) => {
      console.log('params',params);

      if (params && params.id) {
        this.id = params.id;
        this.id = atob(unescape(params.id));
        console.log(this.id);
        if (this.id) {
          this.findDocumentById(this.id);
        }
      }
    }); */

 // console.log("bizProfileNumber", this.bizProfileNumber);

    this.initializeForm();
   // console.log(this.bizProfileNumber)
  }
  findDocumentById(id): void {
    this.customerApiService.findCreateProfileById(this.id, Customer_Basic_Details.findDocuments)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res) => {
        const result: any = res;
        if (result.status === 200 && result.data && result.data.length > 0) {
          const data = result.data[0];
          // Trigger change detection to update the view (optional)
        //  console.log(data)
        }
      });
  }


  get f() {
    return this.documentsForm.controls;
  }
  initializeForm(): void {
    this.documentsForm = this.fb.group({
      bizId: this.bizProfileNumber[0]?.bizId,
      createdBy: this.user.userId.toString(),
      createdDate: "2023-07-24T06:19:01.233Z",
      deafult: true,
      deviceId: "https://www.www.ww",
      documentId: 0,
      documentNumber: "",
      expiryDate: "",
      firstName: "",
      ipAddress: "192.178.10.171",
      issueDate: "",
      issuedBy: "",
      issuedCountry: "",
      issuedPlace: "",
      middleName: "",
      storedDocuments: "",
      surName: "",
      type: "",
      updatedBy: this.user.userId.toString(),
      updatedDate: "2023-07-24T06:19:01.233Z",
      validCountry: ""
    });
  }
  onSubmitForm(){
    this.submitted = true;
     if (this.documentsForm.invalid) {
      this.toastr.error("Please give all required fields to submit");
      return;
    }
    if (this.documentsForm.valid) {
      const data={
        ...this.documentsForm.value,
      };
      this.customerApiService
        .createCreateProfile(
          data,
          Customer_Basic_Details.createDocuments
        )
        .pipe(takeUntil(this.ngUnSubscribe))
        .subscribe((res) => {
          const result: any = res;
          if (result.status === 201) {
            this.toastr.success(result.message);
          } else {
            this.toastr.error(
              "Oops! Something went wrong  while send the data",
              "Error"
            );
          }
        });
    } else {
      return this.toastr.error("Please fill the required fields", "Error");
    }
  }
  ngOnDestroy():void{
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
