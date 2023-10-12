import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyHomeComponent } from './agency-home.component';

describe('AgencyHomeComponent', () => {
  let component: AgencyHomeComponent;
  let fixture: ComponentFixture<AgencyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
