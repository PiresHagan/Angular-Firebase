import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalseoEnComponent } from './localseo-en.component';

describe('LocalseoEnComponent', () => {
  let component: LocalseoEnComponent;
  let fixture: ComponentFixture<LocalseoEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalseoEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalseoEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
