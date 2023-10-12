import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyCartComponent } from './agency-cart.component';

describe('AgencyCartComponent', () => {
  let component: AgencyCartComponent;
  let fixture: ComponentFixture<AgencyCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
