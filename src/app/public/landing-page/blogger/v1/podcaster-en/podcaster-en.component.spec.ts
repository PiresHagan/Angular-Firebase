import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcasterEnComponent } from './podcaster-en.component';

describe('PodcasterEnComponent', () => {
  let component: PodcasterEnComponent;
  let fixture: ComponentFixture<PodcasterEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcasterEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcasterEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
