import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyWebinarEnComponent } from './academy-webinar-en.component';

describe('AcademyWebinarEnComponent', () => {
  let component: AcademyWebinarEnComponent;
  let fixture: ComponentFixture<AcademyWebinarEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyWebinarEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyWebinarEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
