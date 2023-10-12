import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityEnComponent } from './charity-en.component';

describe('CharityEnComponent', () => {
  let component: CharityEnComponent;
  let fixture: ComponentFixture<CharityEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
