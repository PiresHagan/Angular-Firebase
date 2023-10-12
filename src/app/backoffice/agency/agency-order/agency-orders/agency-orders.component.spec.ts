import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyOrdersComponent } from './agency-orders.component';

describe('AgencyOrdersComponent', () => {
  let component: AgencyOrdersComponent;
  let fixture: ComponentFixture<AgencyOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
