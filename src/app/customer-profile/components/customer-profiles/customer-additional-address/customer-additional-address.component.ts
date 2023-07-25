import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-customer-additional-address',
  templateUrl: './customer-additional-address.component.html',
  styleUrls: ['./customer-additional-address.component.scss']
})
export class CustomerAdditionalAddressComponent implements OnInit {
  private ngUnSubscribe: Subject<void>;
  @Output() tab1Data: EventEmitter<any> = new EventEmitter<any>();
  @Input() patchData:any;
//  @Input() tab1Data: any;
  constructor() { }


  ngOnInit(): void {
    this.ngUnSubscribe = new Subject<void>();
    if (this.tab1Data) {
      this.additionalList();
    }
   // console.log("additionalAddress",this.tab1Data)
   // console.log("additionalAddress", this.patchData)
  }
  additional_address_data=[
    {
      id:"1",
    }
  ];
  additionalList(){

  }
  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
