import { StorageService } from './../../../../shared/services/storage.service';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Customer_Basic_Details, pax_image_url } from 'app/customer-profile/constants/custom-api-url';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerApiService } from 'app/customer-profile/services/customer-api.service';
import { UserResponse } from 'app/shared/models/login-response';
@Component({
  selector: 'app-customer-basic-details',
  templateUrl: './customer-basic-details.component.html',
  styleUrls: ['./customer-basic-details.component.scss']
})
export class CustomerBasicDetailsComponent implements OnInit, OnDestroy {
  @Output() tab1Data: EventEmitter<any> = new EventEmitter<any>();
  @Input()  patchData:any;
  private ngUnSubscribe: Subject<void>;
  basicDetailsForm: FormGroup;
  profile: FormGroup;
  user: UserResponse
  communication: FormGroup;
  privacy: FormGroup;
  address: FormGroup;
  characteristics: FormGroup;
  submitted= false;
  file: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  // images files
  file1: File = null;
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = 'assets/img/profile/profile.jpg';
  //return respones id
  tabData: any = {};
  responseEmpId: number;
  encryptresponseId: any;
  editimageUrl: any;
  //image loading
  loading = false; // Flag variable
  isloading = false;
  id: any;
  encryptBizId: any;
  isEdit: boolean;
  constructor(
    private fb: FormBuilder,
    private imageCompress: NgxImageCompressService,
    private customerApiService: CustomerApiService,
    private titleService: Title,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.ngUnSubscribe = new Subject<void>();
    this.user = this.storageService.getUser();
    this.initPrivacyFormGroup();
    this.initProfileFormGroup();
    this.initCommunicationFormGroup();
    this.initAddressFormGroup();
    this.initCharacteristicsFormGroup();

    this.basicDetailsForm = this.fb.group({
      profile: this.profile,
      communication: this.communication,
      privacy: this.privacy,
      address: this.address,
      characteristics: this.characteristics,
      createdBy: this.user.userId.toString(),
      createdDate: "2023-07-14T10:26:44.042Z",
      deviceId: "https://www.www.ww",
      ipAddress: "192.178.10.171",
      updatedBy: this.user.userId.toString(),
      updatedDate: "2023-07-14T10:26:44.042Z",
      bizId: this.id,
    });

    // Subscribe to form value changes
    this.basicDetailsForm.valueChanges
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(formData => {
        this.tab1Data.emit(formData);
      });

      this.tab1Data.emit(this.basicDetailsForm.value);
      if(this.patchData){
        this.formDataPatching(this.patchData);
      }
    }
    formDataPatching(data:any){
      this.basicDetailsForm.patchValue(data);

    }
  private initPrivacyFormGroup(): void {
    this.privacy = this.fb.group({
      privacyId: 0,
      bizId : 0,
      legallyRestricts: [true],
      acceptsMailings: [true],
      personalInfo: [true],
      mailReturned: [true]
    });
  }

  private initProfileFormGroup(): void {
    this.profile = this.fb.group({
      bizId: 0,
      id: 0,
      salutation: ['', Validators.required],
      title: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      surName: [''],
      alias: [''],
      dpImageUrl: [''],
      envelope: [''],
    });
  }

  private initCommunicationFormGroup(): void {
    this.communication = this.fb.group({
      bizId: 0,
      communicationId: 0,
      phoneNumber: [''],
      emailId: [''],
      fax: [''],
      webApplicationPassword: [''],
      webApplicationUrl: [''],
      webApplicationlogin: [''],
    });
  }

  private initAddressFormGroup(): void {
    this.address = this.fb.group({
      bizId: 0,
      addressId: 0,
      company: [''],
      street: [''],
      city: [''],
      address: [''],
      zipCode: [''],
      state: [''],
      country: [''],
      area: [''],
    });
  }

  private initCharacteristicsFormGroup(): void {
    this.characteristics = this.fb.group({
      bizId: 0,
      characteristicsId: 0,
      gender: [''],
      type: [''],
      nationality: [''],
      importCode: [''],
      ageGroup: [''],
      enquiry: [''],
      firstEnquiry: [''],
      previousEnquiry: [''],
    });
  }
  findByCustomerProfileId(id: any) {
    this.encryptBizId = id; // Set the bizId to encryptBizId property
    this.customerApiService.findCreateProfileById(id, Customer_Basic_Details.find)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res) => {
        const result: any = res;
      //  console.log(result);
        if (result.status === 200) {
          this.isEdit = true;
          const data = result.data[0];
          this.tabData = {
            profile: {
              id: data.profile?.id || '',
              title: data.profile?.title || '',
              salutation: data.profile?.salutation || '',
              firstName: data.profile?.firstName || '',
              middleName: data.profile?.middleName || '',
              surName: data.profile?.surName || '',
              alias: data.profile?.alias || '',
              envelope: data.profile?.envelope || '',
              dpImageUrl: data.profile?.dpImageUrl || ''
            },
            characteristics: {
              characteristicsId: data.characteristics?.characteristicsId || '',
              bizId: data.characteristics?.bizId || '',
              gender: data.characteristics?.gender || '',
              type: data.characteristics?.type || '',
              importCode: data.characteristics?.importCode || '',
              nationality: data.characteristics?.nationality || '',
              ageGroup: data.characteristics?.ageGroup || '',
              enquiry: data.characteristics?.enquiry || '',
              firstEnquiry: data.characteristics?.firstEnquiry || '',
              previousEnquiry: data.characteristics?.previousEnquiry || '',
              deviceId: data.characteristics?.deviceId || '',
              ipAddress: data.characteristics?.ipAddress || ''
            },
            address: {
              addressId: data.address?.addressId || '',
              bizId: data.address?.bizId || '',
              company: data.address?.company || '',
              city: data.address?.city || '',
              address: data.address?.address || '',
              street: data.address?.street || '',
              zipCode: data.address?.zipCode || '',
              state: data.address?.state || '',
              country: data.address?.country || '',
              deviceId: data.address?.deviceId || '',
              ipAddress: data.address?.ipAddress || '',
              area: data.address?.area || ''
            },
            privacy: {
              privacyId: data.privacy?.privacyId || '',
              bizId: data.privacy?.bizId || '',
              legallyRestricts: data.privacy?.legallyRestricts || false,
              acceptsMailings: data.privacy?.acceptsMailings || false,
              personalInfo: data.privacy?.personalInfo || false,
              mailReturned: data.privacy?.mailReturned || false,
              deviceId: data.privacy?.deviceId || '',
              ipAddress: data.privacy?.ipAddress || ''
            },
            communication: {
              communicationId: data.communication?.communicationId || '',
              phoneNumber: data.communication?.phoneNumber || '',
              bizId: data.communication?.bizId || '',
              emailId: data.communication?.emailId || '',
              fax: data.communication?.fax || '',
              webApplicationPassword: data.communication?.webApplicationPassword || '',
              webApplicationUrl: data.communication?.webApplicationUrl || '',
              webApplicationlogin: data.communication?.webApplicationlogin || '',
              deviceId: data.communication?.deviceId || '',
              ipAddress: data.communication?.ipAddress || ''
            }
          };

          // console.log('tab1Data',this.tab1Data);


        }
      });
  }
  selectFile(event: any) {
    let fileName: any;
    this.file = event.target.files[0];
    fileName = this.file["name"];
    if (event.target.files && event.target.files[0]) {
      const isImage = event.target.files[0];
      if (isImage.type === "image/jpeg" || isImage.type === "image/png") {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.localUrl = event.target.result;
          this.imageUrl = event.target.result;
          this.compressFile(this.localUrl, fileName);
        };
        reader.readAsDataURL(event.target.files[0]);
      } else {
        this.toastr.error("Please upload only images", "Error");
        return;
      }
    }
  }
  compressFile(image, fileName) {
    let orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    this.imageCompress.compressFile(image, orientation, 50, 50).then((result) => {
      this.imgResultAfterCompress = result;
      this.localCompressedURl = result;
      this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
      // create file from byte
      const imageName = fileName;
      // call method that creates a blob from dataUri
      const imageBlob = this.dataURItoBlob(
        this.imgResultAfterCompress.split(",")[1]
      );
      //imageFile created below is the new compressed file which can be send to API in form data
      const imageFile = new File([result], imageName, { type: "image/jpeg" });
      // file to send
      this.file1 = new File([imageBlob], imageName, { type: "image/jpeg" });
      this.isloading = true;
      this.callImagesServices();

    });
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: "image/jpeg" });
    return blob;
  }
  //images post call method here
  callImagesServices() {
    this.isloading = true; // Flag variable
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uuid = '';
    for (let i = 0; i < 6; i++) {
      uuid += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    this.customerApiService.imageUpload(this.file1, uuid, pax_image_url.imageposturl).pipe(takeUntil(this.ngUnSubscribe)).subscribe((profileResponse) => {
      const imageData1 = {
        entityName: profileResponse.entityName,
        entityCdnUrl: profileResponse.entityCdnUrl,
      };
      this.imageUrl = profileResponse.entityCdnUrl;
      if (profileResponse) {
        this.isloading = false; // Flag variable
        this.profile.patchValue({
          dpImageUrl: profileResponse?.entityCdnUrl
        });

      } else {
        this.isloading = false; // Flag variable
        this.toastr.error('image  not uploaded', "Error");
      }
    },
      (err) => {
        this.isloading = false; // Flag variable
        this.toastr.error('Oops! Something went wrong ', 'Error');
      });
  }
  //edit images created method
  editImageUpload() {
    this.loading = true;
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    this.customerApiService.imageUpload(this.file1, result, pax_image_url.imageposturl).pipe(takeUntil(this.ngUnSubscribe)).subscribe((profileResponse) => {
      const imageData1 = {
        entityName: profileResponse.entityName,
        entityCdnUrl: profileResponse.entityCdnUrl,
      };
      if (profileResponse) {
        this.loading = false; // Flag variable
      } else {
        this.loading = false;
        this.toastr.error('image  not uploaded', "Error");
      }
      this.editimageUrl = profileResponse?.entityCdnUrl;
      this.profile.patchValue({
        dpImageUrl: profileResponse?.entityCdnUrl
      });
    },
      (err) => {
        this.isloading = false; // Flag variable
        this.toastr.error('Oops! Something went wrong ', 'Error');
      });
  }
  onSubmit() {
    this.submitted = true;
    if (this.basicDetailsForm.invalid) {
      this.toastr.error("Please give all required fields to submit");
      return;
    }
    if (this.basicDetailsForm.valid) {
      const formData = this.basicDetailsForm.value;
      this.tab1Data.emit(formData);
    //  console.log(formData);
      this.customerApiService
      .createCreateProfile(formData, Customer_Basic_Details.create)
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
get f(){
   return this.profile.controls;
}
ngOnDestroy():void{
  this.ngUnSubscribe.next();
  this.ngUnSubscribe.complete();
}
}
