import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer_Basic_Details } from "app/customer-profile/constants/custom-api-url";
import { CustomerApiService } from "app/customer-profile/services/customer-api.service";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-customer-emergency-contact",
  templateUrl: "./customer-emergency-contact.component.html",
  styleUrls: ["./customer-emergency-contact.component.scss"],
})
export class CustomerEmergencyContactComponent implements OnInit, OnDestroy {
  private ngUnSubscribe: Subject<void>;
  @Output() tab3Data: EventEmitter<any> = new EventEmitter<any>();
  submitted = false;
  tabData: any = {};
  @Input() patchEmergencyData: any;
  emergencyContactForm: FormGroup;
  emergencyContactRequest: FormGroup;
  emergencyPrivateRequest: FormGroup;
  emergencyAddressRequest: FormGroup;
  emergencyCommunicationRequest: FormGroup;
  emergencyOtherDetailsRequest: FormGroup;
  id: any;
  encryptBizId: any;
  isTab3Edit: boolean;

  constructor(
    private fb: FormBuilder,
    private customerApiService: CustomerApiService,
    private titleService: Title,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.ngUnSubscribe = new Subject<void>();
    this.route.params.pipe(takeUntil(this.ngUnSubscribe)).subscribe((params) => {
      if (params && params.id) {
        this.id = params.id;
        this.id = atob(unescape(params.id));
      //  console.log(this.id);
        if (this.id) {
          this.findByEmergencyContactById(this.id);
        }
      }
    });
    this.initEmergencyPrivateRequestFormGroup();
    this.initEmergencyContactRequestFormGroup();
    this.initEmergencyAddressRequestFormGroup();
    this.initEmergencyCommunicationRequestFormGroup();
    this.initEmergencyOtherDetailsRequestFormGroup();

    this.emergencyContactForm = this.fb.group({
      emergencyContactRequest: this.emergencyContactRequest,
      emergencyPrivateRequest: this.emergencyPrivateRequest,
      emergencyAddressRequest: this.emergencyAddressRequest,
      emergencyCommunicationRequest: this.emergencyCommunicationRequest,
      emergencyOtherDetailsRequest: this.emergencyOtherDetailsRequest,
      createdBy: 0,
      createdDate: "2023-07-19T05:38:19.094Z",
      deviceId: "string",
      ipAddress: "string",
      updatedBy: 0,
      updatedDate: "2023-07-19T05:38:19.095Z",
    });
    this.emergencyContactForm.valueChanges
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((formEmergencyContactData) => {
      //  console.log("formEmergencyContactData",formEmergencyContactData);

        this.tab3Data.emit(formEmergencyContactData);
      });
    this.tab3Data.emit(this.emergencyContactForm.value);
    if (this.patchEmergencyData) {
    //  console.log("patchEmergencyData", this.patchEmergencyData);
      this.formDataPatching(this.patchEmergencyData);
    }
  }

  findByEmergencyContactById(id: any) {
    this.encryptBizId = id; // Set the bizId to encryptBizId property
    this.customerApiService.findCreateProfileById(id, Customer_Basic_Details.findEmergencyContactId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res) => {
        const result: any = res;
      //  console.log(result);
        if (result.status === 200 && result.data && result.data.length > 0) {
          this.isTab3Edit = true;
          const data = result.data[0];
          this.tabData = {
            emergencyPrivateRequest: {
              privateId: data?.emergencyPrivateRequest?.privateId || '',
              emergencyContactId: data?.emergencyPrivateRequest?.emergencyContactId || '',
              bizId: data?.emergencyPrivateRequest?.bizId || '',
              dateOfBirth: data?.emergencyPrivateRequest?.dateOfBirth || null,
              birthPlace: data?.emergencyPrivateRequest?.birthPlace || '',
              birthCountry: data?.emergencyPrivateRequest?.birthCountry || '',
              occupation: data?.emergencyPrivateRequest?.occupation || '',
              previousSurName: data?.emergencyPrivateRequest?.previousSurName || '',
              deviceId: data?.emergencyPrivateRequest?.deviceId || '',
              ipAddress: data?.emergencyPrivateRequest?.ipAddress || '',
            },
            emergencyAddressRequest: {
              emergencyAddressId: data?.emergencyAddressRequest?.emergencyAddressId || '',
              emergencyContactId: data?.emergencyAddressRequest?.emergencyContactId || '',
              bizId: data?.emergencyAddressRequest?.bizId || '',
              address: data?.emergencyAddressRequest?.address || '',
              city: data?.emergencyAddressRequest?.city || '',
              zipCode: data?.emergencyAddressRequest?.zipCode || '',
              state: data?.emergencyAddressRequest?.state || '',
              country: data?.emergencyAddressRequest?.country || '',
              deviceId: data?.emergencyAddressRequest?.deviceId || '',
              ipAddress: data?.emergencyAddressRequest?.ipAddress || '',
            },
            emergencyContactRequest: {
              emergencyContactId: data?.emergencyContactRequest?.emergencyContactId || '',
              bizId: data?.emergencyContactRequest?.bizId || '',
              salutation: data?.emergencyContactRequest?.salutation || '',
              title: data?.emergencyContactRequest?.title || '',
              firstName: data?.emergencyContactRequest?.firstName || '',
              middleName: data?.emergencyContactRequest?.middleName || '',
              sureName: data?.emergencyContactRequest?.sureName || '',
              alias: data?.emergencyContactRequest?.alias || '',
              gender: data?.emergencyContactRequest?.gender || '',
              relation: data?.emergencyContactRequest?.relation || '',
              mailing: data?.emergencyContactRequest?.mailing || '',
              envelopeDetails: data?.emergencyContactRequest?.envelopeDetails || '',
              deviceId: data?.emergencyContactRequest?.deviceId || '',
              ipAddress: data?.emergencyContactRequest?.ipAddress || '',
            },
            emergencyOtherDetailsRequest: {
              otherDetailsId: data?.emergencyOtherDetailsRequest?.otherDetailsId || '',
              emergencyContactId: data?.emergencyOtherDetailsRequest?.emergencyContactId || '',
              bizId: data?.emergencyOtherDetailsRequest?.bizId || '',
              comments: data?.emergencyOtherDetailsRequest?.comments || '',
              deviceId: data?.emergencyOtherDetailsRequest?.deviceId || '',
              ipAddress: data?.emergencyOtherDetailsRequest?.ipAddress || '',
            },
            emergencyCommunicationRequest: {
              emergencyCommunicationId: data?.emergencyCommunicationRequest?.emergencyCommunicationId || '',
              emergencyContactId: data?.emergencyCommunicationRequest?.emergencyContactId || '',
              bizId: data?.emergencyCommunicationRequest?.bizId || '',
              phoneNumber: data?.emergencyCommunicationRequest?.phoneNumber || null,
              emailId: data?.emergencyCommunicationRequest?.emailId || '',
              webApplicationUrl: data?.emergencyCommunicationRequest?.webApplicationUrl || '',
              fax: data?.emergencyCommunicationRequest?.fax || '',
              deviceId: data?.emergencyCommunicationRequest?.deviceId || '',
              ipAddress: data?.emergencyCommunicationRequest?.ipAddress || '',
            }
          };
        //  console.log("Tab3DataCheck", this.tab3Data);

          // Trigger change detection to update the view (optional)

        }
      });
  }

  formDataPatching(patchEmergencyData: any) {
    this.emergencyContactForm.patchValue(patchEmergencyData);
   //  console.log('emergencyContactForm', this.emergencyContactForm.value);
  }
  private initEmergencyPrivateRequestFormGroup(): void {
    this.emergencyPrivateRequest = this.fb.group({
      dateOfBirth: [""],
      birthPlace: [""],
      birthCountry: [""],
      occupation: [""],
      previousSurName: [""],
      privateId: 0,
    });
  }
  private initEmergencyContactRequestFormGroup(): void {
    this.emergencyContactRequest = this.fb.group({
      salutation: [""],
      title: [""],
      firstName: [""],
      middleName: [""],
      sureName: [""],
      alias: [""],
      gender: [""],
      relation: [""],
      mailing: [""],
      envelopeDetails: [""],
      emergencyContactId: 0,
      bizId: ''
    });
  }
  private initEmergencyAddressRequestFormGroup(): void {
    this.emergencyAddressRequest = this.fb.group({
      address: [""],
      city: [""],
      state: [""],
      country: [""],
      zipCode: [""],
      emergencyAddressId: 0,
    });
  }
  private initEmergencyOtherDetailsRequestFormGroup(): void {
    this.emergencyOtherDetailsRequest = this.fb.group({
      comments: [""],
      otherDetailsId: 0,
    });
  }
  private initEmergencyCommunicationRequestFormGroup(): void {
    this.emergencyCommunicationRequest = this.fb.group({
      phoneNumber: [""],
      emailId: [""],
      webApplicationUrl: [""],
      fax: [""],
      emergencyCommunicationId: 0,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.emergencyContactForm.invalid) {
      this.toastr.error("Please give all required fields to submit");
      return;
    }
 /*    if (this.emergencyContactForm.valid) {
      const formEmergencyContactData = this.emergencyContactForm.value;
      this.tab3Data.emit(formEmergencyContactData); */
      if (this.emergencyContactForm.valid) {
        const modifyData={
          bizId: Number(this.id)
        };
        const mergeObject={
          ...this.emergencyContactForm.value.emergencyContactRequest,
          ...modifyData,
        };
        const data={
          ...this.emergencyContactForm.value,
          emergencyContactRequest: mergeObject
        };
        const formEmergencyContactData = data;
        this.tab3Data.emit(formEmergencyContactData);
      //  console.log(formEmergencyContactData);
    //  console.log(formEmergencyContactData);
      this.customerApiService
        .createCreateProfile(
          formEmergencyContactData,
          Customer_Basic_Details.createEmergencyContact
        )
        .pipe(takeUntil(this.ngUnSubscribe))
        .subscribe((res) => {
          const result: any = res;
          if (result.status === 200) {
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
  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
