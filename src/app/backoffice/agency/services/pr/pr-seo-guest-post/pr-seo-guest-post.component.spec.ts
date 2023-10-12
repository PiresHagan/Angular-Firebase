import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrSeoGuestPostComponent } from './pr-seo-guest-post.component';

describe('PrSeoGuestPostComponent', () => {
  let component: PrSeoGuestPostComponent;
  let fixture: ComponentFixture<PrSeoGuestPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrSeoGuestPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrSeoGuestPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
