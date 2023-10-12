import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyEnComponent } from './academy-en.component';

describe('AcademyEnComponent', () => {
  let component: AcademyEnComponent;
  let fixture: ComponentFixture<AcademyEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
