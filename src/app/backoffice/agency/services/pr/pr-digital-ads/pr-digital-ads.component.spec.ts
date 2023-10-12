import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrDigitalAdsComponent } from './pr-digital-ads.component';

describe('PrDigitalAdsComponent', () => {
  let component: PrDigitalAdsComponent;
  let fixture: ComponentFixture<PrDigitalAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrDigitalAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrDigitalAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
