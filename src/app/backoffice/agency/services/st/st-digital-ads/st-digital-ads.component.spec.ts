import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StDigitalAdsComponent } from './st-digital-ads.component';

describe('StDigitalAdsComponent', () => {
  let component: StDigitalAdsComponent;
  let fixture: ComponentFixture<StDigitalAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StDigitalAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StDigitalAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
