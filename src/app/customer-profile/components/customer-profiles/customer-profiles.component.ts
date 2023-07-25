import { DatePipe } from "@angular/common";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { Customer_Basic_Details } from "app/customer-profile/constants/custom-api-url";
import { customerProfileApiResponseData } from "app/customer-profile/models/customer-profile-response";
import { CustomerApiService } from "app/customer-profile/services/customer-api.service";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-customer-profiles",
  templateUrl: "./customer-profiles.component.html",
  styleUrls: ["./customer-profiles.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerProfilesComponent implements OnInit, OnDestroy {
  private ngUnSubscribe: Subject<void>;
  basicDetailsForm: FormGroup;
  tab1Data: any = {};
  tab2Data: any = {};
  tab3Data: any = {};
  tab4Data: any = {};
  active: number;
  activeId: string[] = [];
  submitted = false;
  isEdit = false;
  isTab3Edit = false;
  isTab2Edit = false;
  bizId: string;
  id: string;
  encryptBizId: any;
  @ViewChild("sectionContainer") sectionContainer: ElementRef;
  @ViewChild("sectionElement") sectionElement: ElementRef;

  profileUrl: string;
  tab1Save: string;
  tab2Save: string;
  tab3Save: string;
  tab4Save: string;

  activeBizId:string;
  constructor(
    private fb: FormBuilder,
    private customerApiService: CustomerApiService,
    private titleService: Title,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ngUnSubscribe = new Subject<void>();
    this.route.params
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((params) => {
        if (params && params.id) {
          this.activeBizId = params.id;
          this.id = atob(unescape(params.id));
          //  console.log(this.id);
          if (this.id) {
            this.findByCustomerProfileId(this.id);
            this.findByEmergencyContactById(this.id);
            this.findAdditionalDetailsById(this.id);
          }
        }
      });
   /*    this.route.params.subscribe(params => {
        const id = params['id'];
        console.log('Current route parameter (id):', id);
  }) */
}
	onNavChange(changeEvent: NgbNavChangeEvent) {
    const activeTabName = this.getTabNameFromId(changeEvent.nextId);
    // console.log(activeTabName);
      const dataToSend={
        activeTab:activeTabName
      }
    // Create an object to hold the query parameters
    const queryParams: NavigationExtras = {
      queryParams: dataToSend
    };

    // Navigate to the target component with the query parameters
    this.router.navigate(['customer/customer-profiles/',this.activeBizId], queryParams);
  }


  getTabNameFromId(tabId: number): string {
    switch (tabId) {
      case 1:
        return 'Tab1';
      case 2:
        return 'Tab2';
      case 3:
        return 'Tab3';
        case 4:
          return 'Tab4';
          case 5:
            return 'Tab5';
            case 6:
              return 'Tab6';
              case 7:
              return 'Tab7';
              case 8:
              return 'Tab8';
              case 9:
              return 'Tab9';
              case 10:
              return 'Tab10';
      default:
        return 'Unknown';
    }
  }
  /*   handleTab1Data(updatedData: any) {
    // Patch the updated data into the parent form
    this.tab1Data = { ...this.tab1Data, ...updatedData };
    this.tab2Data = { ...this.tab2Data, ...updatedData };
    this.tab3Data = { ...this.tab3Data, ...updatedData };
  } */
  handleTab1Data(updatedData: any) {
    this.tab1Data = null;
  //  console.log("tab1",updatedData);

    if(updatedData) {
      this.tab1Save = "edit";
      this.tab1Data = updatedData
    }
  }

  handleTab2Data(updatedData: any) {
    this.tab2Data = null;
    if(updatedData) {
      this.tab2Save = "edit";
      this.tab2Data = updatedData;
    }
    console.log("tab2Data", this.tab2Data);
  }

  handleTab3Data(updatedData: any) {
  //  console.log("updatedData", updatedData);
    this.tab3Save = null;
    if (updatedData) {
      this.tab3Save = "edit";
      this.tab3Data = updatedData;
    }
  //  console.log("tab3Data", this.tab3Data);
  }
  handleTab4Data(updatedData: any) {
    //  console.log("updatedData", updatedData);
      this.tab4Save = null;
      if (updatedData) {
        this.tab4Save = "edit";
        this.tab4Data = updatedData;
      }
    //  console.log("tab3Data", this.tab3Data);
    }
  findByCustomerProfileId(id: any) {
    this.encryptBizId = id; // Set the bizId to encryptBizId property
    this.customerApiService
      .findCreateProfileById(id, Customer_Basic_Details.find)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res) => {
        const result: any = res;
        //  console.log(result);
        if (result.status === 200) {
          this.isEdit = true;
          const data = result.data[0];
          this.tab1Data = {
            profile: {
              id: data.profile?.id || "",
              title: data.profile?.title || "",
              salutation: data.profile?.salutation || "",
              firstName: data.profile?.firstName || "",
              middleName: data.profile?.middleName || "",
              surName: data.profile?.surName || "",
              alias: data.profile?.alias || "",
              envelope: data.profile?.envelope || "",
              dpImageUrl: data.profile?.dpImageUrl || "",
            },
            characteristics: {
              characteristicsId: data.characteristics?.characteristicsId || "",
              bizId: data.characteristics?.bizId || "",
              gender: data.characteristics?.gender || "",
              type: data.characteristics?.type || "",
              importCode: data.characteristics?.importCode || "",
              nationality: data.characteristics?.nationality || "",
              ageGroup: data.characteristics?.ageGroup || "",
              enquiry: data.characteristics?.enquiry || "",
              firstEnquiry: data.characteristics?.firstEnquiry || "",
              previousEnquiry: data.characteristics?.previousEnquiry || "",
              deviceId: data.characteristics?.deviceId || "",
              ipAddress: data.characteristics?.ipAddress || "",
            },
            address: {
              addressId: data.address?.addressId || "",
              bizId: data.address?.bizId || "",
              company: data.address?.company || "",
              city: data.address?.city || "",
              address: data.address?.address || "",
              street: data.address?.street || "",
              zipCode: data.address?.zipCode || "",
              state: data.address?.state || "",
              country: data.address?.country || "",
              deviceId: data.address?.deviceId || "",
              ipAddress: data.address?.ipAddress || "",
              area: data.address?.area || "",
            },
            privacy: {
              privacyId: data.privacy?.privacyId || "",
              bizId: data.privacy?.bizId || "",
              legallyRestricts: data.privacy?.legallyRestricts || false,
              acceptsMailings: data.privacy?.acceptsMailings || false,
              personalInfo: data.privacy?.personalInfo || false,
              mailReturned: data.privacy?.mailReturned || false,
              deviceId: data.privacy?.deviceId || "",
              ipAddress: data.privacy?.ipAddress || "",
            },
            communication: {
              communicationId: data.communication?.communicationId || "",
              phoneNumber: data.communication?.phoneNumber || "",
              bizId: data.communication?.bizId || "",
              emailId: data.communication?.emailId || "",
              fax: data.communication?.fax || "",
              webApplicationPassword:
                data.communication?.webApplicationPassword || "",
              webApplicationUrl: data.communication?.webApplicationUrl || "",
              webApplicationlogin:
                data.communication?.webApplicationlogin || "",
              deviceId: data.communication?.deviceId || "",
              ipAddress: data.communication?.ipAddress || "",
            },
          };

          // console.log('tab1Data',this.tab1Data);

          this.cdr.markForCheck();
        }
      });
  }

  findByEmergencyContactById(id: any) {
    this.encryptBizId = id; // Set the bizId to encryptBizId property
    this.customerApiService
      .findCreateProfileById(id, Customer_Basic_Details.findEmergencyContactId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res) => {
        const result: any = res;
        //  console.log(result);
        if (result.status === 200 && result.data && result.data.length > 0) {
          this.isTab3Edit = true;
          const data = result.data[0];
          this.tab3Data = {
            emergencyPrivateRequest: {
              privateId: data?.emergencyPrivateRequest?.privateId || "",
              emergencyContactId:
                data?.emergencyPrivateRequest?.emergencyContactId || "",
              bizId: data?.emergencyPrivateRequest?.bizId || "",
              dateOfBirth:
                this.datePipe.transform(
                  data?.emergencyPrivateRequest?.dateOfBirth,
                  "yyyy-MM-dd"
                ) || "",
              birthPlace: data?.emergencyPrivateRequest?.birthPlace || "",
              birthCountry: data?.emergencyPrivateRequest?.birthCountry || "",
              occupation: data?.emergencyPrivateRequest?.occupation || "",
              previousSurName:
                data?.emergencyPrivateRequest?.previousSurName || "",
              deviceId: data?.emergencyPrivateRequest?.deviceId || "",
              ipAddress: data?.emergencyPrivateRequest?.ipAddress || "",
            },
            emergencyAddressRequest: {
              emergencyAddressId:
                data?.emergencyAddressRequest?.emergencyAddressId || "",
              emergencyContactId:
                data?.emergencyAddressRequest?.emergencyContactId || "",
              bizId: data?.emergencyAddressRequest?.bizId || "",
              address: data?.emergencyAddressRequest?.address || "",
              city: data?.emergencyAddressRequest?.city || "",
              zipCode: data?.emergencyAddressRequest?.zipCode || "",
              state: data?.emergencyAddressRequest?.state || "",
              country: data?.emergencyAddressRequest?.country || "",
              deviceId: data?.emergencyAddressRequest?.deviceId || "",
              ipAddress: data?.emergencyAddressRequest?.ipAddress || "",
            },
            emergencyContactRequest: {
              emergencyContactId:
                data?.emergencyContactRequest?.emergencyContactId || "",
              bizId: data?.emergencyContactRequest?.bizId || "",
              salutation: data?.emergencyContactRequest?.salutation || "",
              title: data?.emergencyContactRequest?.title || "",
              firstName: data?.emergencyContactRequest?.firstName || "",
              middleName: data?.emergencyContactRequest?.middleName || "",
              sureName: data?.emergencyContactRequest?.sureName || "",
              alias: data?.emergencyContactRequest?.alias || "",
              gender: data?.emergencyContactRequest?.gender || "",
              relation: data?.emergencyContactRequest?.relation || "",
              mailing: data?.emergencyContactRequest?.mailing || "",
              envelopeDetails:
                data?.emergencyContactRequest?.envelopeDetails || "",
              deviceId: data?.emergencyContactRequest?.deviceId || "",
              ipAddress: data?.emergencyContactRequest?.ipAddress || "",
            },
            emergencyOtherDetailsRequest: {
              otherDetailsId:
                data?.emergencyOtherDetailsRequest?.otherDetailsId || "",
              emergencyContactId:
                data?.emergencyOtherDetailsRequest?.emergencyContactId || "",
              bizId: data?.emergencyOtherDetailsRequest?.bizId || "",
              comments: data?.emergencyOtherDetailsRequest?.comments || "",
              deviceId: data?.emergencyOtherDetailsRequest?.deviceId || "",
              ipAddress: data?.emergencyOtherDetailsRequest?.ipAddress || "",
            },
            emergencyCommunicationRequest: {
              emergencyCommunicationId:
                data?.emergencyCommunicationRequest?.emergencyCommunicationId ||
                "",
              emergencyContactId:
                data?.emergencyCommunicationRequest?.emergencyContactId || "",
              bizId: data?.emergencyCommunicationRequest?.bizId || "",
              phoneNumber:
                data?.emergencyCommunicationRequest?.phoneNumber || null,
              emailId: data?.emergencyCommunicationRequest?.emailId || "",
              webApplicationUrl:
                data?.emergencyCommunicationRequest?.webApplicationUrl || "",
              fax: data?.emergencyCommunicationRequest?.fax || "",
              deviceId: data?.emergencyCommunicationRequest?.deviceId || "",
              ipAddress: data?.emergencyCommunicationRequest?.ipAddress || "",
            },
          };
          //  console.log("Tab3DataCheck", this.tab3Data);

          // Trigger change detection to update the view (optional)
          this.cdr.markForCheck();
        }
      });
  }

  findAdditionalDetailsById(id: any) {
    this.encryptBizId = id; // Set the bizId to encryptBizId property
    this.customerApiService
      .findCreateProfileById(
        id,
        Customer_Basic_Details.findAdditionalDetailsById
      )
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res) => {
        const result: any = res;
        //  console.log(result);
        if (result.status === 200 && result.data && result.data.length > 0) {
          this.isTab2Edit = true;
          const data = result.data[0];
          this.tab2Data = {
            bizAdditionalDetailsRepeaterProgram: {
              whoStatus:
                data?.bizAdditionalDetailsRepeaterProgram?.whoStatus || "",
              whoCreatedBy:
                data?.bizAdditionalDetailsRepeaterProgram?.whoCreatedBy || "",
              whoUpdatedBy:
                data?.bizAdditionalDetailsRepeaterProgram?.whoUpdatedBy || "",
              whoCreatedDate:
                data?.bizAdditionalDetailsRepeaterProgram?.whoCreatedDate ||
                null,
              whoUpdatedDate:
                data?.bizAdditionalDetailsRepeaterProgram?.whoUpdatedDate || "",
              id: data?.bizAdditionalDetailsRepeaterProgram?.id || "",
              repeaterNumbers:
                data?.bizAdditionalDetailsRepeaterProgram?.repeaterNumbers ||
                "",
              repeaterLevel:
                data?.bizAdditionalDetailsRepeaterProgram?.repeaterLevel || "",
              pointsCollected:
                data?.bizAdditionalDetailsRepeaterProgram?.pointsCollected ||
                null,
              customerId:
                data?.bizAdditionalDetailsRepeaterProgram?.customerId || 0,
              orgId: data?.bizAdditionalDetailsRepeaterProgram?.orgId || 0,
              bizProfileId:
                data?.bizAdditionalDetailsRepeaterProgram?.bizProfileId || 0,
            },
            bizAdditionalDetailsBenefitProgram: {
              whoStatus:
                data?.bizAdditionalDetailsBenefitProgram?.whoStatus || "",
              whoCreatedBy:
                data?.bizAdditionalDetailsBenefitProgram?.whoCreatedBy || "",
              whoUpdatedBy:
                data?.bizAdditionalDetailsBenefitProgram?.whoUpdatedBy || "",
              whoCreatedDate:
                data?.bizAdditionalDetailsBenefitProgram?.whoCreatedDate ||
                null,
              whoUpdatedDate:
                data?.bizAdditionalDetailsBenefitProgram?.whoUpdatedDate || "",
              id: data?.bizAdditionalDetailsBenefitProgram?.id || "",
              benefitProgramApplicability:
                data?.bizAdditionalDetailsBenefitProgram
                  ?.benefitProgramApplicability || "",
              benefitLevel:
                data?.bizAdditionalDetailsBenefitProgram?.benefitLevel || "",
              benefitStatusBalance:
                data?.bizAdditionalDetailsBenefitProgram
                  ?.benefitStatusBalance || null,
              profileBenefitBeginningDate:
                data?.bizAdditionalDetailsBenefitProgram
                  ?.profileBenefitBeginningDate || null,
              profileBenefitEndDate:
                data?.bizAdditionalDetailsBenefitProgram
                  ?.profileBenefitEndDate || null,
              customerId:
                data?.bizAdditionalDetailsBenefitProgram?.customerId || 0,
              orgId: data?.bizAdditionalDetailsBenefitProgram?.orgId || 0,
              bizProfileId:
                data?.bizAdditionalDetailsBenefitProgram?.bizProfileId || 0,
            },
            bizAdditionalDetailsStatistics: {
              whoStatus: data?.bizAdditionalDetailsStatistics?.whoStatus || "",
              whoCreatedBy:
                data?.bizAdditionalDetailsStatistics?.whoCreatedBy || "",
              whoUpdatedBy:
                data?.bizAdditionalDetailsStatistics?.whoUpdatedBy || "",
              whoCreatedDate:
                data?.bizAdditionalDetailsStatistics?.whoCreatedDate || null,
              whoUpdatedDate:
                data?.bizAdditionalDetailsStatistics?.whoUpdatedDate || "",
              id: data?.bizAdditionalDetailsStatistics?.id || "",
              numberOfBookings:
                data?.bizAdditionalDetailsStatistics?.numberOfBookings || null,
              numberOfTrips:
                data?.bizAdditionalDetailsStatistics?.numberOfTrips || null,
              numberOfDay:
                data?.bizAdditionalDetailsStatistics?.numberOfDay || null,
              customerId: data?.bizAdditionalDetailsStatistics?.customerId || 0,
              orgId: data?.bizAdditionalDetailsStatistics?.orgId || 0,
              bizProfileId:
                data?.bizAdditionalDetailsStatistics?.bizProfileId || 0,
            },
            bizAdditionalDetailsOtherDetails: {
              whoStatus:
                data?.bizAdditionalDetailsOtherDetails?.whoStatus || "",
              whoCreatedBy:
                data?.bizAdditionalDetailsOtherDetails?.whoCreatedBy || "",
              whoUpdatedBy:
                data?.bizAdditionalDetailsOtherDetails?.whoUpdatedBy || "",
              whoCreatedDate:
                data?.bizAdditionalDetailsOtherDetails?.whoCreatedDate || null,
              whoUpdatedDate:
                data?.bizAdditionalDetailsOtherDetails?.whoUpdatedDate || "",
              id: data?.bizAdditionalDetailsOtherDetails?.id || "",
              profileActive:
                data?.bizAdditionalDetailsOtherDetails?.profileActive || false,
              comments: data?.bizAdditionalDetailsOtherDetails?.comments || "",
              customerId:
                data?.bizAdditionalDetailsOtherDetails?.customerId || 0,
              orgId: data?.bizAdditionalDetailsOtherDetails?.orgId || 0,
              bizProfileId:
                data?.bizAdditionalDetailsOtherDetails?.bizProfileId || 0,
            },
            bizAdditionalDetailsWebControls: {
              whoStatus: data?.bizAdditionalDetailsWebControls?.whoStatus || "",
              whoCreatedBy:
                data?.bizAdditionalDetailsWebControls?.whoCreatedBy || "",
              whoUpdatedBy:
                data?.bizAdditionalDetailsWebControls?.whoUpdatedBy || "",
              whoCreatedDate:
                data?.bizAdditionalDetailsWebControls?.whoCreatedDate || null,
              whoUpdatedDate:
                data?.bizAdditionalDetailsWebControls?.whoUpdatedDate || "",
              id: data?.bizAdditionalDetailsWebControls?.id || "",
              allowToChanges:
                data?.bizAdditionalDetailsWebControls?.allowToChanges || false,
              allowToMerge:
                data?.bizAdditionalDetailsWebControls?.allowToMerge || false,
              customerId:
                data?.bizAdditionalDetailsWebControls?.customerId || 0,
              orgId: data?.bizAdditionalDetailsWebControls?.orgId || 0,
              bizProfileId:
                data?.bizAdditionalDetailsWebControls?.bizProfileId || 0,
            },
            bizAdditionalDetailsReferences: {
              whoStatus: data?.bizAdditionalDetailsReferences?.whoStatus || "",
              whoCreatedBy:
                data?.bizAdditionalDetailsReferences?.whoCreatedBy || "",
              whoUpdatedBy:
                data?.bizAdditionalDetailsReferences?.whoUpdatedBy || "",
              whoCreatedDate:
                data?.bizAdditionalDetailsReferences?.whoCreatedDate || null,
              whoUpdatedDate:
                data?.bizAdditionalDetailsReferences?.whoUpdatedDate || "",
              id: data?.bizAdditionalDetailsReferences?.id || "",
              advisor: data?.bizAdditionalDetailsReferences?.advisor || "",
              language: data?.bizAdditionalDetailsReferences?.language || "",
              advisorTeam:
                data?.bizAdditionalDetailsReferences?.advisorTeam || "",
              currency: data?.bizAdditionalDetailsReferences?.currency || "",
              accessGroup:
                data?.bizAdditionalDetailsReferences?.accessGroup || "",
              referrer: data?.bizAdditionalDetailsReferences?.referrer || "",
              customerId: data?.bizAdditionalDetailsReferences?.customerId || 0,
              orgId: data?.bizAdditionalDetailsReferences?.orgId || 0,
              bizProfileId:
                data?.bizAdditionalDetailsReferences?.bizProfileId || 0,
            },
            bizAdditionalDetailsPrivacySettings: {
              whoStatus:
                data?.bizAdditionalDetailsPrivacySettings?.whoStatus || "",
              whoCreatedBy:
                data?.bizAdditionalDetailsPrivacySettings?.whoCreatedBy || "",
              whoUpdatedBy:
                data?.bizAdditionalDetailsPrivacySettings?.whoUpdatedBy || "",
              whoCreatedDate:
                data?.bizAdditionalDetailsPrivacySettings?.whoCreatedDate ||
                null,
              whoUpdatedDate:
                data?.bizAdditionalDetailsPrivacySettings?.whoUpdatedDate || "",
              id: data?.bizAdditionalDetailsPrivacySettings?.id || "",
              privacy01:
                data?.bizAdditionalDetailsPrivacySettings?.privacy01 || false,
              privacy02:
                data?.bizAdditionalDetailsPrivacySettings?.privacy02 || false,
              privacy03:
                data?.bizAdditionalDetailsPrivacySettings?.privacy03 || false,
              customerId:
                data?.bizAdditionalDetailsPrivacySettings?.customerId || 0,
              orgId: data?.bizAdditionalDetailsPrivacySettings?.orgId || 0,
              bizProfileId:
                data?.bizAdditionalDetailsPrivacySettings?.bizProfileId || 0,
            },
            bizAdditionalDetailsModification: {
              whoStatus:
                data?.bizAdditionalDetailsModification?.whoStatus || "",
              whoCreatedBy:
                data?.bizAdditionalDetailsModification?.whoCreatedBy || "",
              whoUpdatedBy:
                data?.bizAdditionalDetailsModification?.whoUpdatedBy || "",
              whoCreatedDate:
                data?.bizAdditionalDetailsModification?.whoCreatedDate || null,
              whoUpdatedDate:
                data?.bizAdditionalDetailsModification?.whoUpdatedDate || "",
              id: data?.bizAdditionalDetailsModification?.id || "",
              createdOn:
                data?.bizAdditionalDetailsModification?.createdOn || null,
              createdBy:
                data?.bizAdditionalDetailsModification?.createdBy || "",
              lastModifiedOn:
                data?.bizAdditionalDetailsModification?.lastModifiedOn || null,
              lastModifiedBy:
                data?.bizAdditionalDetailsModification?.lastModifiedBy || "",
              customerId:
                data?.bizAdditionalDetailsModification?.customerId || 0,
              orgId: data?.bizAdditionalDetailsModification?.orgId || 0,
              bizProfileId:
                data?.bizAdditionalDetailsModification?.bizProfileId || 0,
            },
            bizAdditionalDetails: {
              whoStatus: data?.bizAdditionalDetails?.whoStatus || "",
              whoCreatedBy: data?.bizAdditionalDetails?.whoCreatedBy || "",
              whoUpdatedBy: data?.bizAdditionalDetails?.whoUpdatedBy || "",
              whoCreatedDate:
                data?.bizAdditionalDetails?.whoCreatedDate || null,
              whoUpdatedDate: data?.bizAdditionalDetails?.whoUpdatedDate || "",
              id: data?.bizAdditionalDetails?.id || "",
              /*  this.datepipe.transform(this.updatedata.validFrom, 'yyyy-MM-dd') */
              birthDate:
                this.datePipe.transform(
                  data?.bizAdditionalDetails?.birthDate,
                  "yyyy-MM-dd"
                ) || "",
              birthPlace: data?.bizAdditionalDetails?.birthPlace || "",
              birthCountry: data?.bizAdditionalDetails?.birthCountry || "",
              maritalStatus: data?.bizAdditionalDetails?.maritalStatus || "",
              occupation: data?.bizAdditionalDetails?.occupation || "",
              customerId: data?.bizAdditionalDetails?.customerId || null,
              orgId: data?.bizAdditionalDetails?.orgId || null,
              bizProfileId: data?.bizAdditionalDetails?.bizProfileId || 0,
            },
            bizAdditionalDetailsAdditional: {
              whoStatus: data?.bizAdditionalDetailsAdditional?.whoStatus || "",
              whoCreatedBy:
                data?.bizAdditionalDetailsAdditional?.whoCreatedBy || "",
              whoUpdatedBy:
                data?.bizAdditionalDetailsAdditional?.whoUpdatedBy || "",
              whoCreatedDate:
                data?.bizAdditionalDetailsAdditional?.whoCreatedDate || null,
              whoUpdatedDate:
                data?.bizAdditionalDetailsAdditional?.whoUpdatedDate || "",
              id: data?.bizAdditionalDetailsAdditional?.id || "",
              insuraneNo:
                data?.bizAdditionalDetailsAdditional?.insuraneNo || "",
              billingName:
                data?.bizAdditionalDetailsAdditional?.billingName || "",
              additionalComments:
                data?.bizAdditionalDetailsAdditional?.additionalComments ||
                null,
              clarificationType:
                data?.bizAdditionalDetailsAdditional?.clarificationType || null,
              clarificationRelatedComments:
                data?.bizAdditionalDetailsAdditional
                  ?.clarificationRelatedComments || null,
              customerId: data?.bizAdditionalDetailsAdditional?.customerId || 0,
              orgId: data?.bizAdditionalDetailsAdditional?.orgId || null,
              bizProfileId:
                data?.bizAdditionalDetailsAdditional?.bizProfileId || 0,
            },
          };
          // Trigger change detection to update the view (optional)
          this.cdr.markForCheck();
        }
      });
  }

  isFormDataValid(formData: any): boolean {
    if (formData.firstName)
      /* {
      // Add additional validation rules as needed
      if (formData.firstName.length >= 2 && formData.phone.length === 10) {
        return true;
      }
    } */
      return false;
  }

  onSubmit() {
    //  console.log('Saving data...');
    // console.log('Tab 1 data:', this.tab1Data);
    this.submitted = true;

    // Check if all required fields are provided
    /*  if (!this.isFormDataValid(this.tab1Data)) {
        this.toastr.error("Please provide all required fields to submit");
        return;
      } */
    this.customerApiService
      .createCreateProfile(this.tab1Data, Customer_Basic_Details.create)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res) => {
        const result: any = res;
        if (result.status === 200) {
          this.toastr.success(result.message);
          const bizId = result?.data[0]?.profile?.id;
          if (bizId) {
            //  console.log(bizId)
            this.encryptBizId = btoa(escape(bizId));
            this.router.navigate([
              "customer/customer-profiles",
              this.encryptBizId,
            ]);
            // this.isEdit = true;
          }
          // Get the bizId from the response
        } else {
          this.toastr.error(
            "Oops! Something went wrong while sending the data",
            "Error"
          );
        }
      });
  }

  onEdit(): void {
    /*  this.submitted = true;
    // console.log(this.tab1Data)
     this.customerApiService
       .updateProfile(this.id, this.tab1Data)
       .pipe(takeUntil(this.ngUnSubscribe))
       .subscribe(
         (res) => {
           const result: any = res;
           if (result.status === 200) {
             this.toastr.success(result.message);
           } else {
             this.toastr.error('Oops! Something went wrong while updating the data', 'Error');
           }
         },
         (error) => {
           this.toastr.error('Oops! Something went wrong while updating the data', 'Error');
         //  console.error(error);
         }
       ); */
    this.submitted = true;
    /*   if (this.emergencyContactForm.invalid) {
        this.toastr.error("Please give all required fields to submit");
        return;
      } */
    /*  if (this.emergencyContactForm.valid) {
       const formData = this.emergencyContactForm.value;
       this.tab3Data.emit(formData);
       console.log(formData); */
    this.customerApiService
      .createCreateProfile(
        this.tab3Data,
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
  }

  showSlideIcon: boolean = false;

  scrollToRight() {
    const container = this.sectionElement.nativeElement.parentElement;
    container.scrollLeft += container.offsetWidth;
    this.showSlideIcon = !this.showSlideIcon;
    const section = this.sectionContainer.nativeElement;
    section.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  scrollToLeft() {
    const container = this.sectionElement.nativeElement.parentElement;
    container.scrollLeft -= container.offsetWidth;
    this.showSlideIcon = !this.showSlideIcon;
    const section = this.sectionContainer.nativeElement;
    section.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "end",
    });
  }

  checktabs: string = "basicDetailsTab";

  basicDetails() {
    this.checktabs = "basicDetailsTab";
  }

  additionalDetails() {
    this.checktabs = "additionalDetailsTab";
  }

  emergencyContactTab() {
    this.checktabs = "emergencyContactTab";
  }

  additionalAddressTab() {
    this.checktabs = "additionalAddressTab";
  }

  documentsTab() {
    this.checktabs = "documentsTab";
  }

  noteTab() {
    this.checktabs = "noteTab";
  }

  CustomFolioInfoTab() {
    this.checktabs = "CustomFolioInfoTab";
  }

  additional_address_data = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
    {
      id: "5",
    },
    {
      id: "6",
    },
    {
      id: "7",
    },
    {
      id: "8",
    },
    {
      id: "9",
    },
    {
      id: "10",
    },
  ];

  documents_data = [
    {
      id: "1",
      stored_documents: "Joe Smith",
      type: "Passport",
      document_number: "PS31185867",
      issuing_country: "United States",
      issue_name: "United States-Department of States",
      showCheckbox: true,
      expiry_date: "20-April-2030",
    },
    {
      id: "2",
      showCheckbox: false,
    },
    {
      id: "3",
      showCheckbox: false,
    },
    {
      id: "4",
      showCheckbox: false,
    },
    {
      id: "5",
      showCheckbox: false,
    },
    {
      id: "6",
      showCheckbox: false,
    },
    {
      id: "7",
      showCheckbox: false,
    },
    {
      id: "8",
      showCheckbox: false,
    },
    {
      id: "9",
      showCheckbox: false,
    },
    {
      id: "10",
      showCheckbox: false,
    },
  ];

  emails_data = [
    {
      id: "1",
      type: "Personal",
      email: "joesmith@gmail.com",
      showCheckbox: true,
    },
    {
      id: "2",
      showCheckbox: false,
    },
    {
      id: "3",
      showCheckbox: false,
    },
    {
      id: "4",
      showCheckbox: false,
    },
    {
      id: "5",
      showCheckbox: false,
    },
    {
      id: "6",
      showCheckbox: false,
    },
    {
      id: "7",
      showCheckbox: false,
    },
    {
      id: "8",
      showCheckbox: false,
    },
    {
      id: "9",
      showCheckbox: false,
    },
    {
      id: "10",
      showCheckbox: false,
    },
  ];

  phoneNumber_data = [
    {
      id: "1",
      type: "Personal",
      phone: "+44 123 456 7890",
      showCheckbox: true,
    },
    {
      id: "2",
      showCheckbox: false,
    },
    {
      id: "3",
      showCheckbox: false,
    },
    {
      id: "4",
      showCheckbox: false,
    },
    {
      id: "5",
      showCheckbox: false,
    },
    {
      id: "6",
      showCheckbox: false,
    },
    {
      id: "7",
      showCheckbox: false,
    },
    {
      id: "8",
      showCheckbox: false,
    },
    {
      id: "9",
      showCheckbox: false,
    },
    {
      id: "10",
      showCheckbox: false,
    },
  ];

  fax_data = [
    {
      id: "1",
      type: "Work",
      fax: "+1 123 456 7890",
      showCheckbox: true,
    },
    {
      id: "2",
      showCheckbox: false,
    },
    {
      id: "3",
      showCheckbox: false,
    },
    {
      id: "4",
      showCheckbox: false,
    },
    {
      id: "5",
      showCheckbox: false,
    },
    {
      id: "6",
      showCheckbox: false,
    },
    {
      id: "7",
      showCheckbox: false,
    },
    {
      id: "8",
      showCheckbox: false,
    },
    {
      id: "9",
      showCheckbox: false,
    },
    {
      id: "10",
      showCheckbox: false,
    },
  ];

  addToContacts(id: any, type: any, value: any, index: any) {
    //   console.log('addToContacts:', id, type, value, index);
  }

  onTabChange(event: any) {
    //  console.log(event);
  }

 /*  editFormUpdate(value: Boolean) {
    console.log("value", value);

    if(value){
      console.log("tab1 ", this.tab1Data);
      console.log("tab2 ", this.tab2Data);
      console.log("tab3 ", this.tab3Data);
    }
    if (this.tab1Save === "edit") {
      console.log("tab1 ", this.tab1Data);
    }
    if (this.tab2Save === "edit") {
      console.log("tab2 ", this.tab2Data);
    }
    if (this.tab3Save === "edit") {
      console.log("tab3 ", this.tab3Data);
    }
  } */
  editFormUpdate(value: Boolean) {
    console.log("value", value);
    if (value) {
      console.log("tab1 ", this.tab1Data);
      console.log("tab2 ", this.tab2Data);
      console.log("tab3 ", this.tab3Data);
    }

    if (this.tab1Save === "edit") {
      console.log("tab1 ", this.tab1Data);
    }

    if (this.tab2Save === "edit") {
      console.log("tab2 ", this.tab2Data);
    }

    if (this.tab3Save === "edit") {
      console.log("tab3 ", this.tab3Data);
    }
  }


  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
