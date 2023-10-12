import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyCheckoutComponent } from './agency-checkout.component';

describe('AgencyCheckoutComponent', () => {
  let component: AgencyCheckoutComponent;
  let fixture: ComponentFixture<AgencyCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
