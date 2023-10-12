import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyEnComponent } from './agency-en.component';

describe('AgencyEnComponent', () => {
  let component: AgencyEnComponent;
  let fixture: ComponentFixture<AgencyEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
