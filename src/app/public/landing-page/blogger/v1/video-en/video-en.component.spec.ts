import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoEnComponent } from './video-en.component';

describe('VideoEnComponent', () => {
  let component: VideoEnComponent;
  let fixture: ComponentFixture<VideoEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
