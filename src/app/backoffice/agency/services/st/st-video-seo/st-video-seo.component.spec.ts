import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StVideoSeoComponent } from './st-video-seo.component';

describe('StVideoSeoComponent', () => {
  let component: StVideoSeoComponent;
  let fixture: ComponentFixture<StVideoSeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StVideoSeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StVideoSeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
