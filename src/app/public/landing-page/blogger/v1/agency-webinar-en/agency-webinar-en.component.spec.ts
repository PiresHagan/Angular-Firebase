import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyWebinarEnComponent } from './agency-webinar-en.component';

describe('AgencyWebinarEnComponent', () => {
  let component: AgencyWebinarEnComponent;
  let fixture: ComponentFixture<AgencyWebinarEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyWebinarEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyWebinarEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
