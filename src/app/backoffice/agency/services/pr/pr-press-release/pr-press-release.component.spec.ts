import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrPressReleaseComponent } from './pr-press-release.component';

describe('PrPressReleaseComponent', () => {
  let component: PrPressReleaseComponent;
  let fixture: ComponentFixture<PrPressReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrPressReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrPressReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
