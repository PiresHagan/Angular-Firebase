import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyBillingDetailComponent } from './agency-billing-detail.component';

describe('AgencyBillingDetailComponent', () => {
  let component: AgencyBillingDetailComponent;
  let fixture: ComponentFixture<AgencyBillingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyBillingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyBillingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
