import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileappEnComponent } from './mobileapp-en.component';

describe('MobileappEnComponent', () => {
  let component: MobileappEnComponent;
  let fixture: ComponentFixture<MobileappEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileappEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileappEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
