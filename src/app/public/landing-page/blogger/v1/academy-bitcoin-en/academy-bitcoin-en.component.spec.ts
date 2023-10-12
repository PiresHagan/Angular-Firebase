import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyBitcoinEnComponent } from './academy-bitcoin-en.component';

describe('AcademyBitcoinEnComponent', () => {
  let component: AcademyBitcoinEnComponent;
  let fixture: ComponentFixture<AcademyBitcoinEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyBitcoinEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyBitcoinEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
