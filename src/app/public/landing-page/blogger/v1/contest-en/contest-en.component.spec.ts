import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestEnComponent } from './contest-en.component';

describe('ContestEnComponent', () => {
  let component: ContestEnComponent;
  let fixture: ComponentFixture<ContestEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
