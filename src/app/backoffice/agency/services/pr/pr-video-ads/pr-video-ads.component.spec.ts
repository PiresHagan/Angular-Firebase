import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrVideoAdsComponent } from './pr-video-ads.component';

describe('PrVideoAdsComponent', () => {
  let component: PrVideoAdsComponent;
  let fixture: ComponentFixture<PrVideoAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrVideoAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrVideoAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
