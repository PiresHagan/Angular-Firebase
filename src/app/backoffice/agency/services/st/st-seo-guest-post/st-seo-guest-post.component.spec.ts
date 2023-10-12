import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StSeoGuestPostComponent } from './st-seo-guest-post.component';

describe('StSeoGuestPostComponent', () => {
  let component: StSeoGuestPostComponent;
  let fixture: ComponentFixture<StSeoGuestPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StSeoGuestPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StSeoGuestPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
