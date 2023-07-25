import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer_Basic_Details } from 'app/customer-profile/constants/custom-api-url';
import { CustomerApiService } from 'app/customer-profile/services/customer-api.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-customer-additional-details',
  templateUrl: './customer-additional-details.component.html',
  styleUrls: ['./customer-additional-details.component.scss']
})
export class CustomerAdditionalDetailsComponent implements OnInit {
  private ngUnSubscribe: Subject<void>;
  submitted = false;
  activeTab: string;
  @Input() patchAdditionalData: any;
  tabData: any = {};
  @Output() tab2Data: EventEmitter<any> = new EventEmitter<any>();
  additionalDetailsForm: FormGroup;
  bizAdditionalDetails: FormGroup;
  bizAdditionalDetailsAdditional: FormGroup;
  bizAdditionalDetailsModification: FormGroup;
  bizAdditionalDetailsRepeaterProgram: FormGroup;
  bizAdditionalDetailsStatistics: FormGroup;
  bizAdditionalDetailsReferences: FormGroup;
  bizAdditionalDetailsWebControls: FormGroup;
  bizAdditionalDetailsPrivacySettings: FormGroup;
  bizAdditionalDetailsBenefitProgram: FormGroup;
  bizAdditionalDetailsOtherDetails: FormGroup;
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
  ) { }

  ngOnInit(): void {
    this.ngUnSubscribe = new Subject<void>();
    this.ngUnSubscribe = new Subject<void>();
    this.route.params.pipe(takeUntil(this.ngUnSubscribe)).subscribe((params) => {
      if (params && params.id) {
        this.id = params.id;
        this.id = atob(unescape(params.id));
        this.activeTab = params.activeTab;
      // /  console.log("Active Tab:", this.activeTab);
      //  console.log(this.id);
        if (this.id) {
          this.findAdditionalDetailsById(this.id);
        }
      }
    });
    this.initbizAdditionalDetailsFormGroup();
    this.initbizAdditionalDetailsAdditionalFormGroup();
    this.initbizAdditionalDetailsModificationFormGroup();
    this.initbizAdditionalDetailsRepeaterProgramFormGroup();
    this.initbizAdditionalDetailsStatisticsFormGroup();
    this.initbizAdditionalDetailsRepeaterProgramFormGroup();
    this.initbizAdditionalDetailsReferencesFormGroup();
    this.initbizAdditionalDetailsWebControlsFormGroup();
    this.initbizAdditionalDetailsPrivacySettingsFormGroup();
    this.initbizAdditionalDetailsBenefitProgramFormGroup();
    this.initbizAdditionalDetailsOtherDetailsFormGroup();
    this.additionalDetailsForm = this.fb.group({
      bizAdditionalDetails: this.bizAdditionalDetails,
      bizAdditionalDetailsModification: this.bizAdditionalDetailsModification,
      bizAdditionalDetailsRepeaterProgram: this.bizAdditionalDetailsRepeaterProgram,
      bizAdditionalDetailsStatistics: this.bizAdditionalDetailsStatistics,
      bizAdditionalDetailsAdditional: this.bizAdditionalDetailsAdditional,
      bizAdditionalDetailsReferences: this.bizAdditionalDetailsReferences,
      bizAdditionalDetailsWebControls: this.bizAdditionalDetailsWebControls,
      bizAdditionalDetailsPrivacySettings: this.bizAdditionalDetailsPrivacySettings,
      bizAdditionalDetailsBenefitProgram: this.bizAdditionalDetailsBenefitProgram,
      bizAdditionalDetailsOtherDetails: this.bizAdditionalDetailsOtherDetails,
      whoCreatedBy: "",
      whoCreatedDate: "2023-07-19T05:38:19.094Z",
      whoStatus: "Active",
      whoUpdatedBy: "",
      whoUpdatedDate: "2023-07-20T12:12:36.294Z"
    });

   // console.log("AdditionalDetailsCheck", this.patchAdditionalData.bizAdditionalDetails?.bizProfileId)
    this.additionalDetailsForm.valueChanges
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe((formAdditionalDetailsData) => {
      this.tab2Data.emit(formAdditionalDetailsData);
    });

  this.tab2Data.emit(this.additionalDetailsForm.value);
  if (this.patchAdditionalData) {
  //  console.log("patchAdditionalData", this.patchAdditionalData);
    this.formDataPatching(this.patchAdditionalData);
  }
}
findAdditionalDetailsById(id: any) {
  this.encryptBizId = id; // Set the bizId to encryptBizId property
  this.customerApiService.findCreateProfileById(id, Customer_Basic_Details.findAdditionalDetailsById)
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe((res) => {
      const result: any = res;
      if (result.status === 200 && result.data && result.data.length > 0) {
        this.isTab3Edit = true;
        const data = result.data[0];


        // Trigger change detection to update the view (optional)

      }
    });
}

private initbizAdditionalDetailsFormGroup(): void {

  this.bizAdditionalDetails = this.fb.group({
    birthDate: [''],
    birthPlace: [''],
    birthCountry: [''],
    maritalStatus: [''],
    occupation: [''],
    customerId: [''],
    orgId: [''],
    id: 0,
    bizProfileId: ''
  });
}

private initbizAdditionalDetailsAdditionalFormGroup(): void {
  this.bizAdditionalDetailsAdditional = this.fb.group({
    insuraneNo: [''],
    billingName: [''],
    additionalComments: [''],
    clarificationType: [''],
    clarificationRelatedComments: [''],
    customerId: 0,
    id: 0,
    orgId: ''
  });
}

private initbizAdditionalDetailsModificationFormGroup(): void {
  this.bizAdditionalDetailsModification = this.fb.group({
    createdOn: [''],
    createdBy: [''],
    lastModifiedOn: [''],
    lastModifiedBy: [''],
    customerId: 0,
    id: 0,
    orgId: 0
  });
}


private initbizAdditionalDetailsRepeaterProgramFormGroup(): void {
  this.bizAdditionalDetailsRepeaterProgram = this.fb.group({
    repeaterNumbers: [''],
    repeaterLevel: [''],
    pointsCollected: [''],
    customerId: 0,
    id: 0,
    orgId: 0
  });
}


private initbizAdditionalDetailsStatisticsFormGroup(): void {
  this.bizAdditionalDetailsStatistics = this.fb.group({
    numberOfBookings: [],
    numberOfTrips: [],
    numberOfDay: [],
    customerId: 0,
    id: 0,
    orgId: 0
  });
}

private initbizAdditionalDetailsReferencesFormGroup(): void {
  this.bizAdditionalDetailsReferences = this.fb.group({
    advisor: [''],
    language: [''],
    advisorTeam: [''],
    currency: [''],
    accessGroup: [''],
    referrer: [''],
    customerId: 0,
    id: 0,
    orgId: 0
  });
}


private initbizAdditionalDetailsPrivacySettingsFormGroup(): void {
  this.bizAdditionalDetailsPrivacySettings = this.fb.group({
    privacy01: [true],
    privacy02: [true],
    privacy03: [true],
    customerId: 0,
    id: [0],
    orgId: 0
  });
}


private initbizAdditionalDetailsWebControlsFormGroup(): void {
  this.bizAdditionalDetailsWebControls = this.fb.group({
    allowToChanges: [true],
    allowToMerge: [true],
    customerId: 0,
    id: 0,
    orgId: 0
  });
}


private initbizAdditionalDetailsBenefitProgramFormGroup(): void {
  this.bizAdditionalDetailsBenefitProgram = this.fb.group({
    benefitProgramApplicability: [''],
    benefitLevel: [''],
    benefitStatusBalance: [],
    profileBenefitBeginningDate: [''],
    profileBenefitEndDate: [''],
    customerId: 0,
    id: 0,
    orgId: 0,
  });
}

private initbizAdditionalDetailsOtherDetailsFormGroup(): void {
  this.bizAdditionalDetailsOtherDetails = this.fb.group({
    profileActive: [true],
    comments: [''],
    customerId: 0,
    id: 0,
    orgId: 0
  });
}


formDataPatching(patchAdditionalData: any) {
 // console.log("patchAdditionalData",patchAdditionalData);

  this.additionalDetailsForm.patchValue(patchAdditionalData);
// console.log('AdditionalDetailsForm', this.additionalDetailsForm.value);
}
  onSubmit() {
    this.submitted = true;
    if (this.additionalDetailsForm.invalid) {
      this.toastr.error("Please give all required fields to submit");
      return;
    }
    if (this.additionalDetailsForm.valid) {
      const modifyData={
        bizProfileId: Number(this.id)
      };

      const mergeObject={
        ...this.additionalDetailsForm.value.bizAdditionalDetails,
        ...modifyData,
      };
      const data={
        ...this.additionalDetailsForm.value,
        bizAdditionalDetails:mergeObject
      };

      const formAdditionalDetailsData = data;

      this.tab2Data.emit(formAdditionalDetailsData);
    //  console.log(formAdditionalDetailsData);
      this.customerApiService
        .createCreateProfile(
          formAdditionalDetailsData,
          Customer_Basic_Details.createAdditionalDetails
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

