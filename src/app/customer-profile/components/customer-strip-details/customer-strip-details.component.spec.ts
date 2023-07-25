import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerStripDetailsComponent } from './customer-strip-details.component';

describe('CustomerStripDetailsComponent', () => {
  let component: CustomerStripDetailsComponent;
  let fixture: ComponentFixture<CustomerStripDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerStripDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerStripDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
